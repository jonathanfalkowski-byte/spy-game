import { expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { initialState, replay } from '../../src/state/reducer';
import { missionBlocks } from '../../src/content/mission';
import {
  readingBlocks,
  personalRecap,
  displayName,
  missionActionLabel,
} from '../../src/ui/reading-presentation';
import { journalEntries } from '../../src/ui/journal-entries';
import { missionStart, runMission } from '../mission-helpers';
import { clinicStart, traverse } from '../clinic-helpers';

const text = (s: ReturnType<typeof initialState>) =>
  s.history
    .flatMap((h) => readingBlocks(h.blocks, h.node))
    .map((b) => b.text)
    .join('\n');

it('repairs the accuracy question only when actually spoken; reading does not authorize or mutate', () => {
  for (const response of ['curiosity', 'silent', 'hostility', 'indifference']) {
    const s = traverse(clinicStart(), { display: 'display.' + response }, 'authorization');
    const before = encodeSave(s);
    const rendered = text(s);
    expect(rendered.includes('It is a prediction, not a photograph of the result.')).toBe(
      response === 'curiosity',
    );
    expect(s.clinic.authorized).toBe(false);
    expect(encodeSave(s)).toBe(before);
    expect(replay(s.ledger, s.contentRevision ?? 11)).toEqual(s);
  }
});

it('keeps all 13 review saves byte-equivalent in state and exact replay after presentation', () => {
  const files = readdirSync('review-saves').filter(
    (f) => f.endsWith('.json') && f !== 'index.json',
  );
  expect(files).toHaveLength(13);
  for (const file of files) {
    const raw = readFileSync('review-saves/' + file, 'utf8');
    const s = decodeSave(raw);
    const before = encodeSave(s);
    text(s);
    personalRecap(s);
    journalEntries(s);
    expect(encodeSave(s)).toBe(before);
    expect(replay(s.ledger, s.contentRevision ?? 11)).toEqual(s);
    expect(JSON.parse(before)).toMatchObject({ schemaVersion: 5, contentVersion: 9 });
    expect(readFileSync('review-saves/' + file, 'utf8')).toBe(raw);
  }
});

it('ties visible predicament to real timing, capture and scrutiny across every source/method/outfit', () => {
  for (const outfit of ['executive', 'socialite', 'shadow']) {
    const start = missionStart(outfit);
    for (const source of ['benton', 'priya', 'celeste', 'insufficient']) {
      for (const method of ['audio', 'photo', 'token']) {
        const s = runMission(start, { assessment: 'source.' + source, method: 'method.' + method });
        const visible = text(s);
        const late = source !== 'benton';
        expect(s.mission.timing).toBe(late ? 'late' : 'timely');
        expect(s.mission.capture?.quality).toBe(
          {
            audio: late ? 'fragment' : 'substantive',
            photo: late ? 'contact' : 'transfer',
            token: late ? 'none' : 'asset',
          }[method],
        );
        if (late && method === 'audio')
          expect(visible).toContain('I cannot record words they have finished saying');
        if (late && method === 'photo')
          expect(visible).toContain('nothing passing between their hands');
        if (late && method === 'token') expect(visible).toContain('You lower your empty hand');
        if (!late && method === 'token') expect(visible).toContain('it is still in my hand');
        expect(visible.includes('your departure is no longer quiet')).toBe(s.mission.scrutiny >= 3);
        expect(s.mission.outcome).toBe('complete');
      }
    }
  }
});

it('never reveals the source or later warning through an early presentation', () => {
  const s = runMission(missionStart(), { assessment: 'source.priya' }, 'method');
  expect(
    readingBlocks(missionBlocks(s), 'mission.method')
      .map((b) => b.text)
      .join(' '),
  ).not.toContain('Benton');
  expect(text(s)).not.toContain('SLOANE COULD HAVE STOPPED');
  expect(personalRecap(s)).toEqual([]);
  expect(missionActionLabel('exchange.follow', 'Follow', s)).toContain('catch what remains');
});

it('retains warning claims verbatim while reframing what remains unanswered', () => {
  const s = runMission();
  const visible = text(s);
  for (const line of [
    'BENTON WAS NOT THE REAL TEST.',
    'YOU WERE.',
    'SLOANE COULD HAVE STOPPED THE EXCHANGE.',
  ])
    expect(visible).toContain(line);
  expect(visible).toContain('If that is true, why let it happen?');
  expect(visible).not.toContain('Your first unscripted decision as Evelyn was not reproducible.');
  expect(
    s.day.records
      .filter((r) => r.key === 'mission.debrief.end' || r.key.startsWith('mission.warning.'))
      .every((r) => r.layer === 'claim'),
  ).toBe(true);
});

it('recaps only concrete choices, keeps private interpretations out and cannot invent a disclosure', () => {
  const s = runMission();
  const baseline = personalRecap(s);
  const changed = structuredClone(s);
  changed.clinic.mirror = 'me';
  changed.clinic.investment = 99;
  changed.relationships.mayaTrust = 999;
  expect(personalRecap(changed)).toEqual(baseline);
  expect(baseline.join(' ')).toContain('left the identity details out');
  expect(baseline.join(' ')).not.toContain('You told Maya about the changed body');
  expect(personalRecap(initialState())).toEqual([]);
  const explicit = runMission(
    traverse(clinicStart(), { recoveryContact: 'contact.identity', profile: 'profile.executive' }),
  );
  expect(personalRecap(explicit).join(' ')).toContain('Evelynn Vale');
  expect(personalRecap(explicit).join(' ')).toContain('executive profile');
});

it('gives each capture a distinctive title without changing its evidentiary category or custody', () => {
  const titles = new Set<string>();
  for (const source of ['benton', 'insufficient'])
    for (const method of ['audio', 'photo', 'token']) {
      const s = runMission(missionStart(), {
        assessment: 'source.' + source,
        method: 'method.' + method,
      });
      const entries = journalEntries(s);
      const capture = entries.find((e) => e.id === 'capture')!;
      titles.add(capture.title);
      expect(capture.type).toBe('capture');
      expect(capture.limits).toBe(s.mission.capture?.limits);
      expect(capture.source).toContain('Held by: ' + displayName(s.mission.capture!.owner));
      expect(entries.find((e) => e.id === 'mission.debrief.end')?.title).toBe(
        'Unknown warning: Benton was not the test',
      );
    }
  expect(titles.size).toBe(6);
  expect(displayName('Evelyn Vale / evelyn')).toBe('Evelynn Vale / evelyn');
});
