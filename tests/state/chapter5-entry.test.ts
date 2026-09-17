import { availableIntents as frozenIntents } from '../../src/persistence/legacy-v15/state/reducer';
import { departure, assignment, choose4, destinations } from '../chapter4-helpers';
import { it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { end4, c5, walk5 } from '../chapter5-helpers';
import { replay, act, initialState } from '../../src/state/reducer';
import { encodeSave, decodeSave } from '../../src/persistence/saves';
import { chapter5Choices } from '../../src/content/chapter5';
import { cash5 } from '../../src/content/chapter5-model';
it('freezes every revision-15 dependency against exact baseline Git bytes', () => {
  const root = 'src/persistence/legacy-v15/';
  const m = JSON.parse(readFileSync(root + 'content-15-hashes.json', 'utf8'));
  const data = execFileSync('git', ['cat-file', '--batch'], {
    input:
      Object.keys(m.files)
        .map((f) => m.sourceCommit + ':src/' + f)
        .join('\n') + '\n',
    maxBuffer: 64 * 1024 * 1024,
  });
  let pos = 0;
  for (const [f, hash] of Object.entries(m.files)) {
    const end = data.indexOf(10, pos),
      head = data.subarray(pos, end).toString().split(' '),
      size = Number(head[2]),
      bytes = readFileSync(root + f);
    expect(head[1]).toBe('blob');
    expect(createHash('sha256').update(bytes).digest('hex')).toBe(hash);
    expect(bytes.equals(data.subarray(end + 1, end + 1 + size)), f).toBe(true);
    pos = end + size + 2;
  }
});
it.each([
  'public',
  'professional',
  'backfire',
  'intimacy-decline',
  'flirt-only',
  'withdraw',
  'fade',
])('authenticates %s ending and preserves complete prefix', (mode) => {
  const before = end4(mode),
    s = c5(before, 'begin');
  expect(replay(before.ledger, 15)).toEqual(before);
  expect(frozenIntents(before as never)).toEqual([]);
  expect(s.history.slice(0, before.history.length)).toEqual(before.history);
  expect(s.ledger.slice(0, before.ledger.length)).toEqual(before.ledger);
  expect(s.day).toEqual(before.day);
  expect(decodeSave(encodeSave(s))).toEqual(s);
});
it.each(['instrumental', 'mixed'])(
  'carries %s intimacy without authorizing another encounter',
  (motive) => {
    const before = end4('fade', motive);
    const s = c5(before, 'begin');
    expect(s.choices['c5.authorization']).toBeUndefined();
    expect(s.choices['c4.intimacy']).toBe(before.choices['c4.intimacy']);
  },
);
it('rejects premature, forged and wrong-version continuation', () => {
  const start = initialState();
  expect(act(start, { type: 'CHAPTER5_CHOOSE', id: 'chapter5.begin' })).toBe(start);
  const before = end4();
  before.choices['c4.income'] = '900';
  expect(act(before, { type: 'CHAPTER5_CHOOSE', id: 'chapter5.begin' })).toBe(before);
  expect(() => replay(end4().ledger, 16)).toThrow('continuation');
});
it('offers no unaffordable purchase and redeems a historical voucher only once', () => {
  const none = walk5(end4(), ['begin', 'go-spend']);
  expect(cash5(none)).toBe(0);
  expect(chapter5Choices(none).some((c) => c.id.includes('.buy-'))).toBe(false);
  let paid = walk5(end4('professional'), ['begin', 'go-spend', 'redeem-voucher']);
  expect(cash5(paid)).toBe(1500);
  expect(chapter5Choices(paid).some((c) => c.id.endsWith('redeem-voucher'))).toBe(false);
  paid = c5(paid, 'buy-phone');
  expect(cash5(paid)).toBe(1380);
  expect(decodeSave(encodeSave(paid))).toEqual(paid);
});

it.each(destinations)(
  'continues the actual %s public ending without inventing Helix resources',
  (destination) => {
    let s = assignment(departure(destination));
    const branch = {
      sloane: 'sloane',
      rook: 'sender',
      voss: 'voss',
      maya: 'maya',
      own: 'independent',
      'julian-mercer': 'independent',
    }[destination];
    for (const id of [
      'public-' + branch,
      'inspect-witness',
      'inspect-restricted',
      'assess',
      'report-accuse',
      'interest-distant',
      'outside-desk',
      'favor-narrow',
      'notice-boundary',
      'power-exploit',
      'quiet-evening',
      'collect',
    ])
      s = choose4(s, id);
    const next = c5(s, 'begin');
    expect(next.choices['c4.finding']).toBe('challenged');
    expect(next.choices['c4.method']).toBe('exploit');
    expect(cash5(next)).toBe(0);
    expect(next.proof).toEqual(s.proof);
    expect(decodeSave(encodeSave(next))).toEqual(next);
  },
);
it('continues a historical no-sex ending without granting current permission', () => {
  const s = c5(end4('fade', 'personal', 'no-sex'), 'begin');
  expect(s.choices['c4.intimacy']).toBe('physical-without-sex');
  expect(s.choices['c5.authorization']).toBeUndefined();
  expect(decodeSave(encodeSave(s))).toEqual(s);
});

it('carries an already redeemed voucher without paying it twice', () => {
  const old = end4('professional');
  const index = old.ledger.findIndex(
    (e) => e.action.type === 'CHAPTER4_CHOOSE' && e.action.id === 'chapter4.reader-pass',
  );
  let s = choose4(replay(old.ledger.slice(0, index), 15), 'redeem');
  for (const e of old.ledger.slice(index)) {
    if (e.action.type !== 'CHAPTER4_CHOOSE') throw Error('Unexpected action');
    s = choose4(s, e.action.id.slice(9));
  }
  s = walk5(s, ['begin', 'go-spend']);
  expect(cash5(s)).toBe(1500);
  expect(chapter5Choices(s).some((c) => c.id.endsWith('redeem-voucher'))).toBe(false);
  expect(decodeSave(encodeSave(s))).toEqual(s);
});
