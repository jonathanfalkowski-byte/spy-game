import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { optionalNpc, type GameState } from '../../src/state/schema';
import { replay } from '../../src/state/reducer';
import { c6, complete19, ids, text, toProof, walk, type Setup } from '../chapter6-helpers';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter6Choices } from '../../src/content/chapter6';
import { get6 } from '../../src/content/chapter6-model';
import { canCompare6, canPredict6 } from '../../src/content/chapter6-proof';
import { deriveRoute6 } from '../../src/content/chapter6-counterpower';

beforeEach(() => vi.stubEnv('VITE_EVE_CHAPTER6', '1'));
afterEach(() => vi.unstubAllEnvs());

const atProof = (opts: Setup & { exposed?: boolean } = {}) =>
  toProof(opts, opts.exposed ? ['counter-monitored', 'counter-none', 'counter-ask-none', 'counter-restored'] : ['counter-skip']);
const opened = (s: GameState, photo = false) => walk(s, ['proof-open', photo ? 'proof-photo' : 'proof-view']);

it('opens the proof with the sender’s message and lets her decline straight to counterpower', () => {
  const s = atProof();
  expect(text(s)).toContain('I will show you where you come from.');
  expect(ids(s)).toEqual(['proof-open', 'proof-decline']);
  const declined = c6(s, 'proof-decline');
  expect(declined.phase).toBe('counterpower');
  expect([get6(declined, 'rook-proof'), get6(declined, 'verify-method')]).toEqual(['untested', 'refused']);
  expect(get6(declined, 'end-position')).toBe('none');
});

it('records a Sloane-visible entry only when the page is photographed', () => {
  const before = atProof().npcs.sloane.known.length;
  expect(opened(atProof()).npcs.sloane.known).toHaveLength(before);
  const photo = opened(atProof(), true);
  expect(get6(photo, 'photo-custody')).toBe('phone');
  expect(photo.npcs.sloane.known.at(-1)?.source).toBe('Axiom-monitored phone capture, Meridian courier page');
});

it('offers verification methods only from what she kept, and refusal always', () => {
  expect(ids(opened(atProof()))).toEqual(['verify-refuse']);
  expect(ids(opened(atProof({ item: true })))).toEqual(['verify-compare', 'verify-refuse']);
  expect(ids(opened(atProof({ verified: true })))).toEqual(['verify-compare', 'verify-refuse']);
  expect(ids(opened(atProof({ greeting: true })))).toEqual(['verify-predict', 'verify-refuse']);
  expect(canCompare6(atProof({ item: true }))).toBe(true);
  expect(canPredict6(atProof({ greeting: true }))).toBe(true);
  const refused = c6(opened(atProof({ item: true })), 'verify-refuse');
  expect([refused.phase, get6(refused, 'rook-proof')]).toEqual(['counterpower', 'untested']);
});

it('supports the leaf by comparison and by a passed prediction, recording what the sender showed', () => {
  const compared = c6(opened(atProof({ verified: true })), 'verify-compare');
  expect([compared.phase, get6(compared, 'rook-proof'), get6(compared, 'verify-method')]).toEqual(['proof', 'supported', 'comparison']);
  expect(ids(compared)).toEqual(['celeste-let-be', 'celeste-press']);
  const predicted = c6(opened(atProof({ greeting: true })), 'verify-predict');
  expect([get6(predicted, 'rook-proof'), get6(predicted, 'verify-method')]).toEqual(['supported', 'prediction']);
  expect(optionalNpc(predicted, 'rook')?.known.map((k) => k.key)).toContain('The Marikina breakfast, Celeste Laurent’s table, the 02:40 handoff.');
  expect(text(predicted)).toContain('The Katong one. God, yes.');
});

it('breaks the prediction if she misled the sender, skipping Celeste and ORACLE', () => {
  const failed = c6(opened(atProof({ greeting: true, misdirect: true })), 'verify-predict');
  expect([failed.phase, get6(failed, 'rook-proof'), get6(failed, 'verify-method')]).toEqual(['counterpower', 'broken', 'prediction']);
  expect(text(failed)).toContain('I do not have every name a year on.');
  expect(text(failed)).not.toContain('The Marikina one');
  expect(optionalNpc(failed, 'rook')?.known.map((k) => k.key)).not.toContain('The Marikina breakfast, Celeste Laurent’s table, the 02:40 handoff.');
});

it('keeps Celeste to her one fact: pressing adds her wariness, not information', () => {
  const supported = c6(opened(atProof({ verified: true })), 'verify-compare');
  const beliefs = supported.npcs.celeste.beliefs.length;
  const kept = c6(supported, 'celeste-let-be');
  expect(kept.npcs.celeste.beliefs).toHaveLength(beliefs);
  expect(kept.choices['c6.layer.celeste-breakfast']).toBe('fact');
  const pressed = c6(supported, 'celeste-press');
  expect(pressed.npcs.celeste.beliefs.at(-1)?.key).toBe('Evelynn pressed about the Singapore breakfast like a lawyer');
  expect(pressed.choices['c6.layer.celeste-limit']).toBe('claim');
  expect(ids(pressed)).toEqual(['oracle-take', 'oracle-leave']);
});

it('offers ORACLE only after support and never states Sloane’s motive', () => {
  const taken = walk(opened(atProof({ verified: true })), ['verify-compare', 'celeste-let-be', 'oracle-take']);
  expect([taken.phase, get6(taken, 'oracle-seen'), get6(taken, 'end-position')]).toEqual(['counterpower', 'yes', 'both']);
  expect(text(taken)).toContain('High probability of voluntary adoption');
  const left = walk(opened(atProof({ greeting: true })), ['verify-predict', 'celeste-let-be', 'oracle-leave']);
  expect([get6(left, 'oracle-seen'), get6(left, 'rook-proof'), get6(left, 'end-position')]).toEqual(['no', 'supported', 'none']);
});

it('gates the end actions exactly, with break and hold always available', () => {
  const decide = (s: GameState) => ids(c6(s, 'counterpower-decide')).sort();
  expect(decide(c6(atProof(), 'proof-decline'))).toEqual(['resolve-break', 'resolve-hold']);
  const oracle = walk(opened(atProof({ verified: true })), ['verify-compare', 'celeste-let-be', 'oracle-take']);
  expect(decide(oracle)).toEqual(['resolve-break', 'resolve-challenge', 'resolve-hold', 'resolve-trade-expose', 'resolve-trade-give']);
  const julian = walk(opened(atProof({ flags: { 'c5.service': 'julian' } })), ['verify-refuse']);
  expect(decide(julian)).toEqual(['resolve-break', 'resolve-enforce', 'resolve-hold']);
  const exposed = c6(atProof({ exposed: true }), 'proof-decline');
  expect(decide(exposed)).toEqual(['resolve-break', 'resolve-hold', 'resolve-protect']);
});

it('records exit-action, the sourced consequence and the route lane for every action', () => {
  const oracle = () => c6(walk(opened(atProof({ verified: true })), ['verify-compare', 'celeste-let-be', 'oracle-take']), 'counterpower-decide');
  // Weighted suggestion (CHAPTER_7_ROUTE_CONFIRM §1): this ORACLE route's proof seeds total outside 5
  // (supported 2, ORACLE 1, comparison 1, sender contact 1), outweighing the +3 primary signal of challenge/break/hold.
  const cases: [GameState, string, string, string][] = [
    [oracle(), 'resolve-challenge', 'exposed', 'outside'],
    [oracle(), 'resolve-trade-expose', 'exposed', 'outside'],
    [oracle(), 'resolve-trade-give', 'exposed', 'outside'],
    [oracle(), 'resolve-break', 'declined', 'outside'],
    [oracle(), 'resolve-hold', 'declined', 'outside'],
    [c6(walk(opened(atProof({ flags: { 'c5.service': 'julian' } })), ['verify-refuse']), 'counterpower-decide'), 'resolve-enforce', 'negotiated', 'executive'],
    [c6(walk(opened(atProof({ flags: { 'c5.service': 'julian' } })), ['verify-refuse']), 'counterpower-decide'), 'resolve-break', 'paid', 'own-power'],
    [c6(c6(atProof({ exposed: true, flags: { 'c5.message-sloane': 'yes' } }), 'proof-decline'), 'counterpower-decide'), 'resolve-protect', 'protected', 'institutional'],
  ];
  for (const [s, action, exitAction, lane] of cases) {
    const done = c6(s, action);
    expect(`${done.scene}.${done.phase}`).toBe('chapter6.complete');
    expect([get6(done, 'resolve-action'), get6(done, 'exit-action'), get6(done, 'route-lane'), get6(done, 'route-overlay')]).toEqual([action, exitAction, lane, '']);
    expect(deriveRoute6(done)?.lane).toBe(lane);
    for (const field of ['benefit', 'provider', 'term', 'obligation', 'alt-cost', 'actor-knowledge', 'request', 'response', 'recovery'])
      expect(get6(done, 'cons.' + field), `${action} ${field}`).toBeTruthy();
    expect(done.choices['c6.rec.consequence']).toBeDefined();
    // Every ending must save: choice values are capped at 80 characters (full sentences live in the note).
    expect(() => encodeSave(done)).not.toThrow();
    expect(text(done)).toContain('But it is yours to write now, and they know it.');
    expect(chapter6Choices(done)).toEqual([]);
  }
});

it('plays a real revision-19 save through the proof and an ending, and the save authenticates', () => {
  let s = walk(complete19('maximal-julian'), ['begin', 'benefit-leverage', 'expect-narrow', 'counter-monitored']);
  s = c6(s, ids(s).includes('counter-none') ? 'counter-none' : 'counter-what-chose');
  s = walk(s, ['counter-ask-bounded', 'counter-restored', 'friction-done', 'exit-expose', 'proof-open', 'proof-photo']);
  const verify = ids(s).find((id) => id === 'verify-compare' || id === 'verify-predict') ?? 'verify-refuse';
  s = c6(s, verify);
  if (s.phase === 'proof') s = walk(s, ['celeste-let-be', 'oracle-take']);
  s = walk(s, ['counterpower-decide', 'resolve-hold']);
  expect(`${s.scene}.${s.phase}`).toBe('chapter6.complete');
  expect(replay(s.ledger, 19)).toEqual(s);
  expect(decodeSave(encodeSave(s))).toEqual(s);
});
