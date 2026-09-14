import { it, expect } from 'vitest';
import { mission, missionStart, runMission } from '../mission-helpers';
import { missionBlocks, approach, debriefEvidence } from '../../src/content/mission';
import { decodeSave, encodeSave, loadGame } from '../../src/persistence/saves';
import { replay } from '../../src/state/reducer';
import { replay as oldReplay } from '../../src/persistence/legacy-v7/state/reducer';
import { EventSchema as OldEvent } from '../../src/persistence/legacy-v7/state/actions';
const base = missionStart('socialite');
const text = (s: typeof base) =>
  missionBlocks(s)
    .map((b) => b.text)
    .join(' ');

it('explains presentation before the first lead only; results and second leads move forward', () => {
  for (const first of ['guest', 'service', 'celeste', 'marcus']) {
    const hub = runMission(base, {}, 'hub');
    const review = mission(hub, 'lead.' + first);
    const explanation = approach(review, review.mission.pending!);
    expect(text(review)).toContain(explanation);
    const result = mission(review, 'lead.confirm');
    expect(text(result)).not.toContain(explanation);
    const back = mission(result, 'lead.return');
    expect(text(back)).not.toContain('From the edge of the gathering');
    expect(text(back)).not.toContain('time for two lines');
    expect(text(back)).toContain('one more lead');
    for (const second of ['guest', 'service', 'celeste', 'marcus'].filter((x) => x !== first)) {
      const next = mission(back, 'lead.' + second);
      expect(text(next)).not.toContain(approach(next, next.mission.pending!));
      expect(text(next)).toContain('This will use one opportunity');
      const done = mission(mission(next, 'lead.confirm'), 'lead.return');
      expect(text(done)).toContain('followed both leads');
      expect(text(done)).not.toContain('time for two lines');
    }
  }
});

it('debrief identifies the actual capture, does not assume questions, and accounts for other lift passengers', () => {
  for (const source of ['benton', 'priya', 'celeste', 'insufficient'])
    for (const method of ['audio', 'photo', 'token']) {
      const s = runMission(
        base,
        { assessment: 'source.' + source, method: 'method.' + method },
        'debrief',
      );
      const prose = text(s);
      const transfer = s.day.records.find((r) => r.key === 'mission.transfer')!;
      expect(transfer.text.includes('capture missed the handover')).toBe(source !== 'benton');
      expect(prose).toContain('They step out');
      expect(prose.includes('Yesterday she said')).toBe(s.day.questions.includes('insider'));
      expect(debriefEvidence(s)).not.toContain('Evelyn’s possession');
      if (s.mission.capture!.quality === 'none')
        expect(prose).toContain('no captured item or recording');
      const closing = runMission(s, {}, 'warning1');
      const reply = closing.history
        .at(-2)!
        .blocks.map((b) => b.text)
        .join(' ');
      expect(reply.includes('Keep what you obtained')).toBe(s.mission.capture!.owner === 'Evelyn');
      expect(text(runMission(s, {}, 'warning3'))).not.toContain('make a question sound');
    }
});

it('authenticates v7 and preserves gameplay at each mission phase while updating saved prose', () => {
  const end = runMission(base, {
    hub: ['lead.service', 'lead.celeste', 'assess.begin'],
    method: 'method.token',
  });
  for (const route of [
    end,
    runMission(base, { assessment: 'source.priya', method: 'method.photo' }),
  ])
    for (let i = base.ledger.length; i <= route.ledger.length; i++) {
      const ledger = route.ledger.slice(0, i),
        old = oldReplay(OldEvent.array().parse(ledger));
      const raw = JSON.stringify({ schemaVersion: 5, contentVersion: 7, state: old });
      const migrated = decodeSave(raw),
        { history: oldHistory, ...oldMechanics } = old,
        { history: newHistory, ...newMechanics } = migrated;
      // Only the late-route journal wording changes; identity, provenance and gameplay are retained.
      if (old.mission.timing === 'late')
        oldMechanics.day.records = oldMechanics.day.records.map((record) =>
          record.key === 'mission.transfer'
            ? {
                ...record,
                text: 'You saw Benton pocket the wafer after turning toward the gallery. Your capture missed the handover.',
              }
            : record,
        );
      // Content 9 makes the capture-choice label neutral before the contact is observed.
      if (oldMechanics.feedback.includes('Try to take Benton’s access token'))
        oldMechanics.feedback = oldMechanics.feedback.replace('Try to take Benton’s access token', 'Try to take the contact’s access token');
      expect(newMechanics).toEqual(oldMechanics);
      expect(migrated).toEqual(replay(ledger));
      expect(decodeSave(encodeSave(migrated))).toEqual(migrated);
      expect(
        loadGame({
          getItem: () => raw,
          setItem: () => {
            throw Error('Unexpected write');
          },
        }),
      ).toMatchObject({ kind: 'ready', raw });
    }
  const bad = oldReplay(OldEvent.array().parse(end.ledger));
  bad.mission.token = 'benton';
  expect(() =>
    decodeSave(JSON.stringify({ schemaVersion: 5, contentVersion: 7, state: bad })),
  ).toThrow();
}, 30000);
