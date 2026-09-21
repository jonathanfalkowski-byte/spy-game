import { it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { departure, destinations, choose4 as c, assignment, evening } from '../chapter4-helpers';
import { chapter4Choices, chapter4Scenes } from '../../src/content/chapter4';
import { sceneById, sceneBlocks } from '../../src/content/scenes';
import { get4, records4 } from '../../src/content/chapter4-model';
import { createChapter4Handoff } from '../../src/narrative/adult-scenes/chapter4';
import { replay, act, availableIntents, initialState } from '../../src/state/reducer';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { StateSchema, type GameState } from '../../src/state/schema';
it('freezes all revision-14 dependencies against their exact Git bytes', () => {
  const root = 'src/persistence/legacy-v14/';
  const m = JSON.parse(readFileSync(root + 'content-14-hashes.json', 'utf8'));
  const bytes = execFileSync('git', ['cat-file', '--batch'], {
    input:
      Object.keys(m.files)
        .map((f) => m.sourceCommit + ':src/' + f)
        .join('\n') + '\n',
    maxBuffer: 32 * 1024 * 1024,
  });
  let pos = 0;
  for (const [f, hash] of Object.entries(m.files)) {
    const frozen = readFileSync(root + f),
      end = bytes.indexOf(10, pos),
      header = bytes.subarray(pos, end).toString().split(' '),
      size = Number(header[2]);
    expect(header[1]).toBe('blob');
    expect(createHash('sha256').update(frozen).digest('hex')).toBe(hash);
    expect(frozen.equals(bytes.subarray(end + 1, end + 1 + size)), f).toBe(true);
    pos = end + size + 2;
  }
});
it('keeps authenticated history old while current revision-17 authoring carries the copy fix', () => {
  const historical = departure();
  const historicalEntry = historical.history.find((entry) => entry.node === 'helix.submitted');
  expect(historicalEntry?.blocks.at(-1)?.text).toContain(
    'the records and connections you chose to attach',
  );
  expect(sceneById['helix.submitted'].blocks[0].text).toContain(
    'the records you reviewed and the connections you recorded',
  );

  const current = act(historical, { type: 'CONTINUE_AUDIT_REVISION' });
  const currentNode = { ...current, scene: 'helix' as const, phase: 'submitted' };
  expect(current.contentRevision).toBe(17);
  expect(sceneBlocks(currentNode)[0].text).toContain(
    'the records you reviewed and the connections you recorded',
  );
});
it.each(destinations)(
  'preserves the exact revision-14 prefix and completes the %s public route',
  (dest) => {
    const old = departure(dest);
    expect(replay(old.ledger, 14)).toEqual(old);
    const first = c(old, 'begin');
    expect(first.ledger.slice(0, old.ledger.length)).toEqual(old.ledger);
    expect(first.history.slice(0, old.history.length)).toEqual(old.history);
    let s = assignment(old);
    const branch = {
      sloane: 'sloane',
      rook: 'sender',
      voss: 'voss',
      maya: 'maya',
      own: 'independent',
      'julian-mercer': 'independent',
    }[dest];
    for (const id of [
      'public-' + branch,
      'inspect-receipt',
      'inspect-template',
      'inspect-restricted',
      'assess',
      'report-process',
      'interest-professional',
      'outside-desk',
      'favor-refuse',
      'notice-boundary',
      'power-protect',
      'quiet-evening',
      'collect',
    ])
      s = c(s, id);
    expect(s.phase).toBe('complete');
    expect(
      s.history
        .at(-2)
        ?.blocks.map((b) => b.text)
        .join(' '),
    ).not.toContain('booking ended yesterday');
    expect(get4(s, 'finding')).toBe('bounded');
    expect(get4(s, 'income')).toBeUndefined();
    expect(s.proof.some((p) => p.key === 'c4.retained-packet')).toBe(true);
    expect(availableIntents(s)).toEqual([{type:'CONTINUE_AUDIT_REVISION'},{type:'CHAPTER5_CHOOSE',id:'chapter5.begin'}]);
    expect(decodeSave(encodeSave(s))).toEqual(s);
    expect(StateSchema.safeParse(s).success).toBe(true);
    expect(s.day).toEqual(old.day);
  },
);
it('rejects forged headers, forged prefix snapshots and prematurely entered Chapter 4', () => {
  const initial = initialState();
  expect(act(initial, { type: 'CHAPTER4_CHOOSE', id: 'chapter4.begin' })).toBe(initial);
  const old = departure();
  const forged = structuredClone(old);
  forged.facts.push('forged');
  expect(act(forged, { type: 'CHAPTER4_CHOOSE', id: 'chapter4.begin' })).toBe(forged);
  expect(() => replay(old.ledger, 15)).toThrow('continuation');
  expect(act(old, { type: 'CHAPTER4_CHOOSE', id: 'chapter4.collect' })).toBe(old);
});
it('honors 18:45 after a no-call departure without inventing a missed appointment', () => {
  let s = c(c(departure('own', { extra: ['move-maya'] }), 'begin'), 'payoff');
  expect(get4(s, 'clock')).toBe('1110');
  s = c(s, 'keep-maya');
  expect(get4(s, 'cal-maya')).toBe('kept');
  expect(get4(s, 'clock')).toBe('1155');
  expect(records4(s).some((r) => r.text.includes('missed'))).toBe(false);
});
it('waits for a selected later call and permits sourced repair of conflicting commitments', () => {
  let s = c(
    c(departure('maya', { late: true, extra: ['book-rook', 'move-sloane'] }), 'begin'),
    'payoff',
  );
  expect(get4(s, 'clock')).toBe('1155');
  expect(get4(s, 'cal-maya')).toBe('kept');
  s = c(s, 'repair-sloane');
  s = c(s, 'repair-rook');
  expect(get4(s, 'cal-sloane')).toBe('repair-requested');
  expect(get4(s, 'cal-rook')).toBe('repair-requested');
  expect(s.npcs.sloane.known.at(-1)?.key).toContain('missed');
});
it('does not punish a cancelled or unaccepted appointment as a no-show', () => {
  const s = assignment(departure('own', { extra: ['cancel-sloane'] }));
  expect(get4(s, 'cal-sloane')).toBe('released');
  expect(get4(s, 'cal-maya')).toBe('unconfirmed');
});
it('keeps withdrawn Julian unavailable and allows collection of his already-earned voucher', () => {
  let s = assignment(departure('own', { helix: true, pressure: true }));
  expect(chapter4Choices(s).some((c) => c.id === 'chapter4.accept-audit')).toBe(false);
  let t = c(c(departure('own', { helix: true, pressure: true }), 'begin'), 'payoff');
  while (t.phase === 'consequences')
    t = c(
      t,
      chapter4Choices(t)
        .find((v) => v.id.includes('.resolve-') || v.id.endsWith('next-day'))!
        .id.slice(9),
    );
  t = c(t, 'redeem');
  expect(get4(t, 'income')).toBe('600');
  expect(chapter4Choices(t).some((c) => c.id.endsWith('.redeem'))).toBe(false);
});
it('limits inquiries and challenges unsupported accusations without inventing guilt', () => {
  let s = c(assignment(), 'public-independent');
  for (const id of ['inspect-observe', 'inspect-witness', 'inspect-restricted']) s = c(s, id);
  expect(chapter4Choices(s).some((v) => v.id.startsWith('chapter4.inspect-'))).toBe(false);
  s = c(c(s, 'assess'), 'report-accuse');
  expect(get4(s, 'recommendation')).toBe('review-required');
  expect(get4(s, 'finding')).toBe('challenged');
  expect(records4(s).find((r) => r.key === 'c4.case-witness')?.layer).toBe('claim');
  expect(s.proof.some((p) => p.key.includes('restricted'))).toBe(false);
});
it.each([false, true])(
  'requires an actual public artifact before a sourced Sloane discovery: %s',
  (published) => {
    const old = departure('julian-mercer', { published });
    const s = evening(assignment(old));
    expect(records4(s).some((r) => r.key === 'c4.public-discovery')).toBe(published);
    expect(s.npcs.sloane.known.some((k) => k.key.includes('900'))).toBe(false);
    expect(s.npcs.sloane.known.some((k) => k.key.includes('attracted'))).toBe(false);
  },
);
it('sends only explicitly selected resource information to Sloane', () => {
  let s = c(assignment(), 'public-independent');
  for (const id of [
    'assess',
    'report-uncertain',
    'interest-distant',
    'outside-desk',
    'favor-narrow',
    'tell-resource',
  ])
    s = c(s, id);
  expect(s.npcs.sloane.known.at(-1)?.key).toContain('municipal reader pass');
  expect(s.npcs.maya.known.some((k) => k.key.includes('municipal reader pass'))).toBe(false);
  expect(records4(s).filter((r) => r.key === 'c4.favor')).toHaveLength(1);
});
it('a false approval gains a disputed copy, costs expedited access and withdraws Julian’s invitation', () => {
  const s = evening(undefined, true, 'exploit');
  expect(s.proof.find((p) => p.key === 'c4.extra-copy')?.source).toContain('contested');
  expect(get4(s, 'personal-withdrawn')).toBe('yes');
  expect(get4(s, 'audit-paid')).toBe('900');
  expect(chapter4Choices(s).map((c) => c.id)).toEqual(['chapter4.quiet-evening']);
  expect(() => createChapter4Handoff(s)).toThrow();
  expect(records4(s).some((r) => r.source.includes('Coordinator forwards'))).toBe(true);
});
it('does not infer attraction or dependency from paid work and a practical favor', () => {
  const s = evening(undefined, false);
  expect(get4(s, 'attraction')).toBeUndefined();
  expect(chapter4Choices(s).map((c) => c.id)).toEqual(['chapter4.quiet-evening']);
  expect(records4(s).find((r) => r.key === 'c4.favor')?.text).toContain('Obligation: none');
  expect(s.relationships).toEqual(departure('julian-mercer').relationships);
});
it.each(['personal', 'instrumental', 'mixed'])(
  'exports an authenticated, non-graphic adult contract with private %s motive',
  (motive) => {
    const s = c(c(evening(), 'motive-' + motive), 'consent-sex');
    const workspace = createChapter4Handoff(s);
    const spec = workspace.issue('fade_to_black');
    expect(workspace.verify(spec)).toEqual(spec);
    expect(spec.participants.map((p) => p.adultEligibility.status)).toEqual(['adult', 'adult']);
    expect(
      spec.participantKnowledge
        .find((p) => p.characterId === 'julian-mercer')
        ?.records.some((r) => r.id === 'private-motive'),
    ).toBe(false);
    expect(() => workspace.issue('explicit_external')).toThrow();
    const end = c(c(s, 'fade'), 'collect');
    expect(get4(end, 'intimacy')).toBe(
      motive === 'personal'
        ? 'voluntary-encounter'
        : motive === 'mixed'
          ? 'mixed-encounter'
          : 'instrumental-encounter',
    );
    expect(get4(end, 'audit-paid')).toBe('900');
    expect(decodeSave(encodeSave(end))).toEqual(end);
    const forged = structuredClone(s);
    forged.choices['c4.motive'] = 'changed';
    expect(() => createChapter4Handoff(forged)).toThrow();
  },
);
it('permits no-sex scope, refusal, flirtation only and withdrawal without loss of fee/access', () => {
  const start = evening();
  for (const id of ['intimacy-decline', 'flirt-only']) {
    const end = c(start, id);
    expect(get4(end, 'audit-paid')).toBe('900');
    expect(get4(end, 'reader-pass')).toBe('yes');
    expect(() => createChapter4Handoff(end)).toThrow();
  }
  const s = c(c(start, 'motive-personal'), 'consent-no-sex');
  expect(createChapter4Handoff(s).issue('fade_to_black').canonicalOutcomeId).toBe(
    'chapter4.physical-without-sex',
  );
  const withdrawn = c(s, 'withdraw');
  expect(get4(withdrawn, 'authorization')).toBe('revoked');
  expect(() => createChapter4Handoff(withdrawn)).toThrow();
  expect(get4(withdrawn, 'audit-paid')).toBe('900');
  expect(get4(c(s, 'fade'), 'intimacy')).toBe('physical-without-sex');
});

it('reaches every authored Chapter 4 node through valid runtime choices', () => {
  const end = c(c(c(c(evening(), 'motive-personal'), 'consent-no-sex'), 'fade'), 'collect');
  const reached = new Set(end.history.map((h) => h.node));
  for (const scene of chapter4Scenes) expect(reached.has(scene.id), scene.id).toBe(true);
});

it.each([{ extra: [] }, { extra: ['cancel-julian-mercer'] }])(
  'does not turn an unanswered or cancelled follow-up into a paid job: $extra',
  ({ extra }) => {
    const s = assignment(departure('own', { helix: true, extra }));
    expect(chapter4Choices(s).some((c) => c.id === 'chapter4.accept-audit')).toBe(false);
  },
);
