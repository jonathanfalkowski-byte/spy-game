import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { deriveConsequences } from '../../src/state/consequences';
import { consequenceRules } from '../../src/content/consequence-rules';
import { act, replay } from '../../src/state/reducer';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { checkpoint, atOffer, day } from '../day-helpers';
import { clinic, clinicStart, traverse } from '../clinic-helpers';
import { toMaya, choice, toAnalysis } from '../helpers';

describe('authenticated read-only consequences', () => {
  it('maps only directional sourced deltas, leaving baselines and other dimensions unspecified', () => {
    const state = checkpoint(true);
    const view = deriveConsequences(state);
    expect(view.relationships).toHaveLength(1);
    expect(view.relationships[0]).toMatchObject({
      sourceCharacter: 'maya',
      targetCharacter: 'player-character',
      dimensions: { trust: { mode: 'delta-only', mappedChange: 1 } },
    });
    expect(Object.keys(view.relationships[0].dimensions)).toEqual(['trust']);
    expect(view.relationships[0].dimensions.trust).not.toHaveProperty('level');
    expect(state.relationships.mayaTrust).not.toBe(1);
    expect(
      view.consequences.every(
        (e) => e.kind !== 'relationship-change' || e.value.mode === 'delta-only',
      ),
    ).toBe(true);
  });
  it('retains concern as an attributed signal without intensity', () => {
    const state = choice(
      choice(choice(toMaya(), 'mayaPromotion.hurt'), 'invitation.yes'),
      'disclosure.nothing',
    );
    const view = deriveConsequences(state);
    expect(view.relationships[0].dimensions).toEqual({});
    expect(view.relationships[0].signals[0].signal).toBe('withholding-concern');
    expect(view.consequences[0].supportingRecords.some((r) => r.kind === 'npc-belief')).toBe(true);
  });
  it.each([
    ['morning.answer', 1],
    ['morning.miss', -1],
  ] as const)('maps only the arranged reliability event %s', (id, amount) => {
    const state = clinic(traverse(clinicStart(), {}, 'contact'), id);
    expect(deriveConsequences(state).relationships[0].dimensions.trust).toMatchObject({
      mode: 'delta-only',
      mappedChange: amount,
    });
  });
  it('does not duplicate consequences on rejected/repeated actions or rereading', () => {
    const state = checkpoint(true);
    expect(act(state, { type: 'CHOOSE_DIALOGUE', id: 'disclosure.voss' })).toBe(state);
    expect(deriveConsequences(state)).toEqual(deriveConsequences(replay(state.ledger, state.contentRevision ?? 11)));
    const reading = toAnalysis();
    const again = act(reading, { type: 'READ_DOCUMENT', id: 'email' });
    expect(deriveConsequences(again)).toEqual(deriveConsequences(reading));
  });
  it.each([
    [false, 'comply', 0],
    [true, 'comply', 1],
    [false, 'maya', 1],
    [true, 'maya', 2],
  ] as const)('keeps lookup=%s / warning=%s paths independent', (voss, security, count) => {
    const state = atOffer(security, 'arrest', 'need', 'evelyn', voss);
    const view = deriveConsequences(state);
    expect(view.leverage).toHaveLength(count);
    for (const record of view.leverage) {
      expect(record.subject).toBe('player-character');
      expect(record.transitions.map((t) => t.status)).toEqual([
        'available',
        'disclosed',
        'threatened',
      ]);
      expect(record.knowledge.map((k) => k.characterId)).toEqual(['sloane', 'player-character']);
      expect(record.validity).toBe('observed-record-not-proof-of-wrongdoing');
      expect(
        view.consequences.find((e) => e.id === record.transitions[0].effectId),
      ).not.toHaveProperty('knowledge');
    }
    expect(view.consequences.filter((e) => e.kind === 'callback')).toHaveLength(count);
    for (const id of ['offer.accept', 'offer.refuse'])
      expect(deriveConsequences(day(state, id)).leverage).toEqual(view.leverage);
  });
  it('does not let later lookup/disclosure contaminate an earlier prefix', () => {
    const state = atOffer('maya', 'arrest', 'need', 'evelyn', true);
    const intro = state.ledger.find(
      (e) => e.action.type === 'DAY_CHOOSE' && e.action.id === 'intro.arrest',
    )!;
    const cutoff = intro.sequence - 1;
    const earlier = deriveConsequences(state, cutoff);
    expect(earlier).toEqual(deriveConsequences(replay(state.ledger.slice(0, cutoff))));
    expect(earlier.leverage).toEqual([]);
    expect(() => deriveConsequences(state, state.revision + 1)).toThrow();
    expect(() => deriveConsequences(state, -1)).toThrow();
  });
  it('rejects a snapshot inconsistent with the authoritative ledger', () => {
    const state = structuredClone(checkpoint(true));
    state.relationships.mayaTrust++;
    expect(() => deriveConsequences(state)).toThrow(/ledger/);
  });
  for (const file of readdirSync('review-saves').filter((f) => /^\d.*\.json$/.test(f)))
    it(`preserves exact review replay and provenance: ${file}`, () => {
      const state = decodeSave(readFileSync(`review-saves/${file}`, 'utf8'));
      const original = encodeSave(state);
      const view = deriveConsequences(state);
      expect(encodeSave(state)).toBe(original);
      expect(replay(state.ledger, state.contentRevision ?? 11)).toEqual(state);
      expect(deriveConsequences(decodeSave(original))).toEqual(view);
      expect(new Set(view.consequences.map((e) => e.id)).size).toBe(view.consequences.length);
      for (const effect of view.consequences) {
        expect(consequenceRules.some((r) => r.id === effect.ruleId)).toBe(true);
        expect(state.ledger.some((e) => e.sequence === effect.sourceEvent)).toBe(true);
        for (const ref of effect.supportingRecords)
          expect(ref.sourceEvent).toBeLessThanOrEqual(effect.sourceEvent);
      }
    });
});
