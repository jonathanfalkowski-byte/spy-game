import { it, expect } from 'vitest';
import { clinic, clinicStart, traverse } from '../clinic-helpers';
import {
  availableClinicChoices,
  clinicChoices,
  clinicScenes,
  clinicBlocks,
} from '../../src/content/clinic';
import { initialState, reducer, replay, nodeOf, availableIntents } from '../../src/state/reducer';
import { StateSchema } from '../../src/state/schema';
import { decodeSave, encodeSave, loadGame } from '../../src/persistence/saves';
import { replay as oldReplay } from '../../src/persistence/legacy-v4/state/reducer';
import { EventSchema as OldEvent } from '../../src/persistence/legacy-v4/state/actions';
import { day, checkpoint, atOffer, evening, endAccepted } from '../day-helpers';
import type { GameState } from '../../src/state/schema';
const start = clinicStart();
it('room occupancy follows recovery and departure; early stop records no adaptation', () => {
  const rest = traverse(start, {}, 'rest');
  expect(rest.clinic.sloanePresent).toBe(false);
  expect(rest.clinic.belongings).toBe('returned');
  const wardrobe = traverse(rest, {}, 'wardrobe');
  expect(wardrobe.clinic.sloanePresent).toBe(true);
  const end = traverse(wardrobe);
  expect(end.clinic.sloanePresent).toBe(false);
  expect(
    end.history.flatMap((h) => h.blocks).some((b) => b.text.includes('She remains at the curb')),
  ).toBe(true);
  const stopped = traverse(start, { authorization: 'stop.request' });
  expect(stopped.clinic.stage).toBe('unchanged');
  expect(stopped.clinic.sloanePresent).toBe(false);
  expect(clinicBlocks(stopped).some((b) => b.text.includes('No adaptation begun'))).toBe(true);
});
const text = (s: GameState) =>
  [...s.clinic.response, ...clinicBlocks(s)].map((b) => b.text).join(' ');
it('only accepted endings offer an explicit next morning; saves do not advance', () => {
  expect(availableClinicChoices(start).map((c) => c.id)).toEqual(['clinic.begin']);
  expect(decodeSave(encodeSave(start))).toEqual(start);
  for (const s of [
    initialState(),
    day(day(checkpoint(), 'day.begin'), 'file.leave'),
    day(day(atOffer(), 'offer.refuse'), 'refusal.walk'),
  ]) {
    expect(availableClinicChoices(s)).toEqual([]);
    expect(
      reducer(s, { type: 'CLINIC_CHOOSE', id: 'clinic.begin', expectedRevision: s.revision }),
    ).toBe(s);
  }
});
it('all privacy and inspection combinations have sourced findings and correct room occupancy', () => {
  for (const privacy of ['stay', 'ask', 'demand', 'silent'])
    for (const exam of ['terminal', 'equipment', 'scan', 'skip']) {
      let s = traverse(
        start,
        { privacy: 'privacy.' + privacy, exam: 'exam.' + exam },
        'examResult',
      );
      expect(s.clinic.opportunity).toBe(exam === 'skip' ? 1 : 0);
      expect(s.clinic.sloanePresent).toBe(['stay', 'silent'].includes(privacy));
      expect(s.day.records.filter((r) => r.key.startsWith('clinic.exam.'))).toHaveLength(
        exam === 'skip' ? 0 : 1,
      );
      if (exam !== 'skip') {
        s = clinic(s, 'exam.followup');
        expect(
          s.npcs.sloane.known.some((x) => x.key === 'Adrian noticed the ' + exam + ' finding'),
        ).toBe(s.clinic.sloanePresent);
        expect(text(s)).toContain('Voss');
      }
      s = clinic(s, 'c.examResult');
      expect(s.clinic.sloanePresent).toBe(true);
      expect(text(s)).toContain(
        ['stay', 'silent'].includes(privacy) ? 'never left' : 'calls Sloane back',
      );
    }
});
it('profile, attention and outward response remain separate across all 80 combinations', () => {
  const base = traverse(start, {}, 'profile');
  for (const profile of ['existing', 'executive', 'socialite', 'operative'])
    for (const attention of ['face', 'body', 'technical', 'sloane', 'away'])
      for (const display of ['hostility', 'indifference', 'curiosity', 'silent']) {
        const s = traverse(
          base,
          {
            profile: 'profile.' + profile,
            simulation: 'attention.' + attention,
            display: 'display.' + display,
          },
          'authorization',
        );
        expect(s.clinic).toMatchObject({
          profile,
          attention,
          displayed: display,
          authorized: false,
          stage: 'unchanged',
          investment: profile === 'existing' ? 0 : 1,
        });
        expect(s.npcs.sloane.beliefs.at(-1)?.source).toContain('not access to private thought');
        expect(encodeSave(decodeSave(encodeSave(s)))).toBe(encodeSave(s));
      }
});
it('review and pause never imply authorization; stop is confirmed at all three stages', () => {
  for (const phase of ['authorization', 'voice', 'face']) {
    let s = traverse(start, {}, phase);
    if (phase === 'authorization') {
      s = clinic(s, 'auth.review');
      expect(s.clinic.authorized).toBe(false);
    } else s = clinic(s, phase + '.pause');
    const stage = s.clinic.stage;
    s = clinic(s, 'stop.request');
    expect(s.clinic.outcome).toBe(null);
    const back = clinic(s, 'stop.back');
    expect(back.clinic.stage).toBe(stage);
    expect(back.clinic.paused).toBe(phase !== 'authorization');
    s = clinic(s, 'stop.confirm');
    expect(s.clinic).toMatchObject({
      stage,
      outcome: 'stopped',
      paused: true,
      credentials: false,
      earpiece: false,
    });
    expect(s.day).toMatchObject({ employment: 'terminated', housing: 'notice30' });
    expect(availableIntents(s)).toEqual([]);
    expect(text(s)).toContain('discharge arrangements pending');
    expect(decodeSave(encodeSave(s))).toEqual(s);
  }
});
it('voice sample, fitting revisions and stale clicks cannot farm or skip stages', () => {
  let s = traverse(start, {}, 'voice');
  const before = s.clinic.investment;
  for (let i = 0; i < 3; i++) s = clinic(s, 'voice.sample');
  expect(s.clinic.investment).toBe(before);
  expect(s.clinic.voice).toBe(null);
  expect(
    reducer(s, { type: 'CLINIC_CHOOSE', id: 'c.faceReply', expectedRevision: s.revision }),
  ).toBe(s);
  s = clinic(s, 'voice.pause');
  s = clinic(s, 'voice.resume');
  s = clinic(s, 'voice.evelyn');
  const stale = { type: 'CLINIC_CHOOSE', id: 'c.voiceReply', expectedRevision: s.revision };
  const next = reducer(s, stale);
  expect(reducer(next, stale)).toBe(next);
  s = traverse(next, {}, 'wardrobe');
  const investment = s.clinic.investment;
  for (const outfit of ['executive', 'socialite', 'shadow']) {
    s = clinic(s, 'outfit.' + outfit);
    s = clinic(s, 'makeup.custom');
    s = clinic(s, 'fit.revise');
  }
  expect(s.clinic.investment).toBe(investment);
  expect(s.clinic.outfit).toBe(null);
});
it('Maya receives only explicit communications and private thoughts stay private', () => {
  const quietStart = endAccepted(evening(), 'avoid');
  for (const morning of ['message', 'quiet'])
    for (const contact of ['brief', 'identity', 'quiet']) {
      const s = traverse(quietStart, {
        contact: 'morning.' + morning,
        recoveryContact: 'contact.' + contact,
        mirror: 'mirror.beautiful',
      });
      expect(s.npcs.maya.known.some((x) => x.key.includes('changed my body'))).toBe(
        contact === 'identity',
      );
      expect(s.npcs.sloane.known.some((x) => x.source.includes('recovery message'))).toBe(false);
      expect(s.day.exposure.some((x) => x.key === 'contact.' + contact)).toBe(contact !== 'quiet');
      expect(s.npcs.sloane.known.some((x) => x.key.includes('Beauty is something I notice'))).toBe(
        false,
      );
    }
  const privateState = traverse(
    start,
    { privacyReply: ['private.stop', 'c.privacyReply'] },
    'exam',
  );
  expect(
    privateState.npcs.voss.known.some((x) => x.source === 'Private examination conversation'),
  ).toBe(true);
  expect(
    privateState.npcs.sloane.known.some((x) => x.source === 'Private examination conversation'),
  ).toBe(false);
  const missed = traverse(start, { contact: 'morning.miss' }, 'recoveryReply');
  expect(text(missed)).toContain('sorry I missed our call');
});
it('all twelve presentations have tailored rehearsal feedback; termination survives reconsideration', () => {
  const base = traverse(endAccepted(evening(atOffer(), true)), {}, 'wardrobe');
  for (const outfit of ['executive', 'socialite', 'shadow'])
    for (const makeup of ['corporate', 'minimal', 'evening', 'custom']) {
      const s = traverse(base, { wardrobe: 'outfit.' + outfit, makeup: 'makeup.' + makeup });
      expect(s.clinic).toMatchObject({
        outfit,
        makeup,
        outcome: 'departed',
        stage: 'complete',
        belongings: 'returned',
        credentials: true,
        earpiece: true,
      });
      expect(s.day.employment).toBe('terminated');
      expect(s.day.records.find((x) => x.key === 'clinic.rehearsal')?.text).toContain(
        outfit === 'executive' ? 'professional' : outfit === 'socialite' ? 'scrutiny' : 'contact',
      );
    }
});
it('every clinic choice and phase is traversable with replay, strict saves, and no dead end', () => {
  const seen = new Set<string>(),
    phases = new Set<string>();
  const visit = (s: GameState) => {
    if (s.scene !== 'clinic') return;
    phases.add(nodeOf(s));
    expect(StateSchema.safeParse(s).success).toBe(true);
    if (!['complete', 'stopped'].includes(s.phase))
      expect(availableIntents(s).length).toBeGreaterThan(0);
    if (!seen.has('phase:' + s.phase)) {
      seen.add('phase:' + s.phase);
      expect(replay(s.ledger)).toEqual(s);
      expect(decodeSave(encodeSave(s))).toEqual(s);
    }
  };
  traverse(start, {}, undefined, visit);
  for (const c of clinicChoices) {
    let base: GameState;
    const phase = c.node.split('.')[1];
    const setup: Record<string, string | string[]> = {};
    if (phase === 'voicePause') setup.voice = 'voice.pause';
    if (phase === 'facePause') setup.face = 'face.pause';
    if (phase === 'stopConfirm') setup.authorization = 'stop.request';
    if (['morning.message', 'morning.quiet'].includes(c.id)) base = endAccepted(evening(), 'avoid');
    else base = start;
    const s = c.id === 'clinic.begin' ? base : traverse(base, setup, phase, visit);
    expect(
      availableClinicChoices(s).some((x) => x.id === c.id),
      c.id + ' @ ' + phase,
    ).toBe(true);
    const after = clinic(s, c.id);
    seen.add(c.node + ':' + c.id);
    visit(after);
    traverse(after, {}, undefined, visit);
  }
  for (const c of clinicChoices) expect(seen.has(c.node + ':' + c.id)).toBe(true);
  for (const s of clinicScenes) expect(phases.has(s.id), s.id).toBe(true);
}, 30000);
it('authenticates content-v4 saves before migration without changing prior decisions', () => {
  for (let i = 0; i <= start.ledger.length; i++) {
    const ledger = OldEvent.array().parse(start.ledger.slice(0, i));
    const old = oldReplay(ledger),
      raw = JSON.stringify({ schemaVersion: 3, contentVersion: 4, state: old });
    const migrated = decodeSave(raw);
    expect(migrated.ledger).toEqual(old.ledger);
    expect(migrated.choices).toEqual(old.choices);
    expect(migrated.clinic.authorized).toBe(false);
    expect(migrated).toEqual(replay(start.ledger.slice(0, i)));
    expect(
      loadGame({
        getItem: () => raw,
        setItem: () => {
          throw Error('load wrote storage');
        },
      }),
    ).toMatchObject({ kind: 'ready', raw });
  }
  const bad = oldReplay(OldEvent.array().parse(start.ledger));
  bad.day.operation = 'refused';
  expect(() =>
    decodeSave(JSON.stringify({ schemaVersion: 3, contentVersion: 4, state: bad })),
  ).toThrow();
});
