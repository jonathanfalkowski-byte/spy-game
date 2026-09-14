import { it, expect } from 'vitest';
import { mission, missionStart, runMission } from '../mission-helpers';
import { clinicStart, traverse } from '../clinic-helpers';
import {
  availableMissionChoices,
  missionChoices,
  missionScenes,
  missionBlocks,
} from '../../src/content/mission';
import { initialMission } from '../../src/state/mission-schema';
import { StateSchema } from '../../src/state/schema';
import { reducer, replay, availableIntents, nodeOf } from '../../src/state/reducer';
import { decodeSave, encodeSave, loadGame } from '../../src/persistence/saves';
import { replay as oldReplay } from '../../src/persistence/legacy-v6/state/reducer';
import { EventSchema as OldEvent } from '../../src/persistence/legacy-v6/state/actions';
const start = missionStart();
const text = (s: ReturnType<typeof missionStart>) =>
  missionBlocks(s)
    .map((b) => b.text)
    .join(' ');

it('only completed clinic departures can continue, and load does not auto-advance', () => {
  expect(availableMissionChoices(start).map((c) => c.id)).toEqual(['mission.begin']);
  const stopped = traverse(clinicStart(), { authorization: 'stop.request' });
  for (const s of [stopped, clinicStart()]) expect(availableMissionChoices(s)).toEqual([]);
  expect(decodeSave(encodeSave(start))).toEqual(start);
  expect(nodeOf(mission(start, 'mission.begin'))).toBe('mission.car');
});

it('covers introductions, private attention and sourced observations without exposing Adrian', () => {
  for (const focus of ['marcus', 'exits', 'mute', 'reflection'])
    for (const greeting of ['poised', 'challenge', 'warm', 'hand'])
      for (const reunion of ['bluff', 'redirect', 'boundary', 'memory']) {
        const s = runMission(
          start,
          {
            elevator: 'entry.' + focus,
            marcus: 'marcus.' + greeting,
            marcusReply: ['marcus.question', 'marcus.close'],
            celeste: 'celeste.' + reunion,
          },
          'hub',
        );
        expect(s.mission.channel).toBe('live');
        expect(s.day.phone).toBe('monitored');
        expect(s.npcs.maya).toEqual(start.npcs.maya);
        expect(s.relationships).toEqual(start.relationships);
        expect(s.npcs.marcus.known.every((x) => !!x.source)).toBe(true);
        expect(s.npcs.celeste.known.every((x) => !!x.source)).toBe(true);
        expect(JSON.stringify(s.npcs.marcus)).not.toMatch(/Adrian|permanent|identity preference/);
        expect(s.mission.leads).toEqual([]);
        expect(s.day.records.some((r) => r.key === 'mission.lead.celeste')).toBe(false);
      }
});

it('reviews actual earlier Maya messages without sending or changing her knowledge', () => {
  const car = mission(start, 'mission.begin');
  const next = mission(car, 'review.maya');
  const oldMessages = new Set(
    car.history
      .flatMap((entry) => entry.blocks)
      .filter((block) => block.speaker === 'Maya · message')
      .map((block) => block.text),
  );
  const reviewed = next.history
    .at(-1)!
    .blocks.filter((block) => block.speaker === 'Maya · earlier message');
  expect(reviewed.length).toBeGreaterThan(0);
  expect(reviewed.every((block) => oldMessages.has(block.text))).toBe(true);
  expect(next.npcs).toEqual(car.npcs);
  expect(next.day.exposure).toEqual(car.day.exposure);
});

it('all six lead pairs work in both orders; review and reread cannot spend or duplicate findings', () => {
  const leads = ['guest', 'service', 'celeste', 'marcus'];
  const hub = runMission(start, {}, 'hub');
  for (const a of leads)
    for (const b of leads.filter((x) => x !== a)) {
      let s = mission(hub, 'lead.' + a);
      expect(s.mission.remaining).toBe(2);
      s = mission(s, 'lead.cancel');
      s = mission(s, 'lead.' + a);
      const action = {
        type: 'MISSION_CHOOSE' as const,
        id: 'lead.confirm',
        expectedRevision: s.revision,
      };
      s = reducer(s, action);
      expect(reducer(s, action)).toBe(s);
      expect(s.mission.remaining).toBe(1);
      s = mission(s, 'lead.return');
      s = mission(s, 'read.' + a);
      const records = s.day.records.length;
      s = mission(s, 'read.return');
      expect(s.day.records).toHaveLength(records);
      s = mission(s, 'lead.' + b);
      s = mission(s, 'lead.confirm');
      s = mission(s, 'lead.return');
      expect(s.mission.leads).toEqual([a, b]);
      expect(s.mission.remaining).toBe(0);
      expect(availableMissionChoices(s).some((c) => c.id.startsWith('lead.'))).toBe(false);
      expect(s.npcs.sloane).toEqual(hub.npcs.sloane);
      expect(decodeSave(encodeSave(s))).toEqual(s);
    }
});

it('separates evidence, reasoning, operational timing and custody across source/method/outfit combinations', () => {
  for (const outfit of ['executive', 'socialite', 'shadow']) {
    const hub = runMission(missionStart(outfit), {}, 'hub');
    for (const source of ['benton', 'priya', 'celeste', 'insufficient'])
      for (const method of ['audio', 'photo', 'token']) {
        const s = runMission(hub, {
          hub: ['lead.guest', 'assess.begin'],
          assessment: 'source.' + source,
          method: 'method.' + method,
        });
        expect(s.mission.outcome).toBe('complete');
        expect(s.mission.extraction).toBe(outfit);
        expect(s.mission.reasoning).toBe(
          source === 'benton'
            ? 'supported'
            : source === 'insufficient'
              ? 'unresolved'
              : 'unsupported',
        );
        const timely = source === 'benton';
        expect(s.mission.timing).toBe(timely ? 'timely' : 'late');
        expect(s.mission.capture?.quality).toBe(
          method === 'audio'
            ? timely
              ? 'substantive'
              : 'fragment'
            : method === 'photo'
              ? timely
                ? 'transfer'
                : 'contact'
              : timely
                ? 'asset'
                : 'none',
        );
        expect(s.mission.capture?.owner).toBe(
          method === 'audio' ? 'Sloane' : method === 'token' && !timely ? 'none' : 'Evelyn',
        );
        expect(s.mission.wafer).toBe('benton');
        expect(s.mission.token).toBe(method === 'token' && timely ? 'evelyn' : 'benton');
        expect(s.mission.wrist).not.toBe('held');
        expect(s.proof.length).toBe(method === 'audio' && timely ? 1 : 0);
        expect(s.npcs.maya).toEqual(hub.npcs.maya);
        expect(s.clinic).toEqual(hub.clinic);
        expect(availableIntents(s)).toEqual([]);
        expect(decodeSave(encodeSave(s))).toEqual(s);
      }
  }
}, 30000);

it('a lucky Benton guess remains unsupported; contextual memory never becomes direct placement', () => {
  for (const lead of [null, 'celeste', 'marcus']) {
    const s = runMission(start, { hub: lead ? ['lead.' + lead, 'assess.begin'] : 'assess.begin' });
    expect(s.mission.reasoning).toBe(lead === 'celeste' ? 'contextual' : 'unsupported');
    expect(s.mission.capture?.quality).toBe('substantive');
  }
  const s = runMission(start, {}, 'assessmentReview');
  expect(s.mission.source).toBeNull();
  expect(s.mission.reasoning).toBeNull();
  expect(text(s)).not.toMatch(/Benton was|Benton enters|supported|correct/);
  const revised = mission(mission(s, 'source.revise'), 'source.insufficient');
  expect(revised.mission.draft).toBe('insufficient');
  expect(revised.mission.source).toBeNull();
});

it('visits every mission choice and phase with deterministic replay, exact resume and obsolete action guards', () => {
  const seen = new Set<string>(),
    phases = new Set<string>();
  const visit = (s: typeof start) => {
    if (s.scene !== 'mission') return;
    const key = nodeOf(s);
    if (!phases.has(key)) expect(decodeSave(encodeSave(s))).toEqual(s);
    phases.add(key);
    expect(StateSchema.safeParse(s).success).toBe(true);
    expect(s.mission.outcome || availableMissionChoices(s).length > 0).toBeTruthy();
  };
  for (const c of missionChoices) {
    const setup: Record<string, string | string[]> = {};
    const phase = c.node.split('.')[1];
    if (['leadReview', 'leadResult'].includes(phase)) setup.hub = 'lead.guest';
    if (phase === 'leadRead') setup.hub = ['lead.guest', 'read.guest'];
    if (c.id.startsWith('read.') && c.id !== 'read.return')
      setup.hub = ['lead.' + c.id.split('.')[1]];
    let s = c.id === 'mission.begin' ? start : runMission(start, setup, phase);
    if (c.id.startsWith('read.') && c.id !== 'read.return')
      s = runMission(mission(s, 'lead.' + c.id.split('.')[1]), {}, 'hub');
    expect(
      availableMissionChoices(s).some((x) => x.id === c.id),
      c.id,
    ).toBe(true);
    const action = { type: 'MISSION_CHOOSE' as const, id: c.id, expectedRevision: s.revision };
    const n = reducer(s, action);
    expect(n).not.toBe(s);
    expect(reducer(n, action)).toBe(n);
    seen.add(c.id);
    expect(decodeSave(encodeSave(n))).toEqual(n);
    visit(n);
    runMission(n, {}, undefined, visit);
  }
  expect(seen.size).toBe(missionChoices.length);
  for (const scene of missionScenes) expect(phases.has(scene.id), scene.id).toBe(true);
  const end = runMission(start);
  expect(replay(end.ledger)).toEqual(end);
  expect(
    reducer(end, { type: 'MISSION_CHOOSE', id: 'exchange.follow', expectedRevision: end.revision }),
  ).toBe(end);
}, 30000);

it('authenticates every v6 phase against its frozen engine, preserving decisions and explicit new defaults', () => {
  for (let i = 0; i <= start.ledger.length; i++) {
    const old = oldReplay(OldEvent.array().parse(start.ledger.slice(0, i)));
    const raw = JSON.stringify({ schemaVersion: 4, contentVersion: 6, state: old });
    const migrated = decodeSave(raw);
    expect(migrated.ledger).toEqual(old.ledger);
    expect(migrated.clinic).toEqual(old.clinic);
    expect(migrated.npcs).toEqual({ ...old.npcs, celeste: { known: [], beliefs: [] } });
    expect(migrated.mission).toEqual(initialMission());
    expect(
      loadGame({
        getItem: () => raw,
        setItem: () => {
          throw Error('Loading must not write');
        },
      }),
    ).toMatchObject({ kind: 'ready', raw });
  }
  const tampered = oldReplay(OldEvent.array().parse(start.ledger));
  tampered.clinic.outfit = 'shadow';
  expect(() =>
    decodeSave(JSON.stringify({ schemaVersion: 4, contentVersion: 6, state: tampered })),
  ).toThrow();
}, 30000);

it('retains original warning text only after debrief, as unidentified claims', () => {
  const s = runMission(start);
  const warnings = s.day.records.filter(
    (r) => r.key === 'mission.debrief.end' || r.key.startsWith('mission.warning.next'),
  );
  expect(warnings.map((r) => r.text)).toEqual([
    'BENTON WAS NOT THE REAL TEST.',
    'YOU WERE.',
    'SLOANE COULD HAVE STOPPED THE EXCHANGE.',
  ]);
  expect(warnings.every((r) => r.layer === 'claim' && r.source.startsWith('Unknown sender'))).toBe(
    true,
  );
  expect(
    s.history
      .flatMap((h) => h.blocks)
      .map((b) => b.text)
      .join(' '),
  ).not.toContain('ASK VOSS WHAT HAPPENED');
});
