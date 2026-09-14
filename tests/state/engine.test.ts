import { describe, it, expect } from 'vitest';
import {
  act,
  reducer,
  initialState,
  replay,
  availableChoices,
  nodeOf,
} from '../../src/state/reducer';
import { StateSchema } from '../../src/state/schema';
import { documents, evaluateRelation } from '../../src/content/evidence';
import { dialogue } from '../../src/content/dialogue';
import { toAnalysis, toMaya, connect, apply, choice, advance, finish } from '../helpers';
import type { Relation } from '../../src/content/schema';
describe('deterministic commits', () => {
  it('does not mutate input; ignores duplicate and stale actions', () => {
    const start = initialState();
    const original = JSON.stringify(start);
    const action = { type: 'CHOOSE_DIALOGUE', id: 'bond.love', expectedRevision: 0 };
    const next = reducer(start, action);
    expect(JSON.stringify(start)).toBe(original);
    expect(next.revision).toBe(1);
    expect(reducer(next, action)).toBe(next);
    expect(act(next, { type: 'CHOOSE_DIALOGUE', id: 'bond.friend' })).toBe(next);
    expect(reducer(start, { type: 'CONTINUE', expectedRevision: 0 })).toBe(start);
    expect(reducer(start, { type: 'CONTINUE', expectedRevision: 0, extra: true })).toBe(start);
  });
  it('records observations once and keeps private attachment private', () => {
    let s = apply(initialState(), { type: 'INSPECT_APARTMENT', id: 'medical' });
    expect(act(s, { type: 'INSPECT_APARTMENT', id: 'medical' })).toBe(s);
    s = choice(s, 'bond.love');
    expect(s.relationships.bond).toBe('love');
    expect(s.npcs.maya.known).toEqual([]);
    expect(s.npcs.maya.beliefs).toEqual([]);
    s = choice(s, 'morning.ignore');
    expect(s.npcs.maya.known).toEqual([]);
  });
  it('rejects unread evidence, a third selection and invalid-phase spending', () => {
    const home = initialState();
    expect(act(home, { type: 'SPEND_INVESTIGATION', id: 'personnel' })).toBe(home);
    let s = toAnalysis();
    s = apply(s, { type: 'TOGGLE_EVIDENCE', id: 'email' });
    s = apply(s, { type: 'TOGGLE_EVIDENCE', id: 'finance' });
    expect(act(s, { type: 'TOGGLE_EVIDENCE', id: 'intel' })).toBe(s);
    s = apply(s, { type: 'TOGGLE_EVIDENCE', id: 'email' });
    expect(s.selected).toEqual(['finance']);
  });
  it('replays the ledger exactly and rejects out-of-sequence history', () => {
    const s = finish(toMaya({ search: 'personnel' }));
    expect(replay(s.ledger)).toEqual(s);
    expect(StateSchema.safeParse(s).success).toBe(true);
    expect(() => replay([{ ...s.ledger[0], sequence: 2 }])).toThrow('sequence');
  });
});
describe('all six pairs and four relationships', () => {
  const expected: Record<string, string> = {
    'email|finance': 'conflict',
    'email|news': 'uncertain',
    'email|intel': 'uncertain',
    'finance|news': 'support',
    'finance|intel': 'support',
    'intel|news': 'support',
  };
  for (let i = 0; i < documents.length; i++)
    for (let j = i + 1; j < documents.length; j++)
      for (const relation of ['conflict', 'support', 'unrelated', 'uncertain'] as Relation[]) {
        const pair = [documents[i].id, documents[j].id];
        const key = [...pair].sort().join('|');
        it(`${key}: ${relation}`, () => {
          let s = toAnalysis();
          for (const id of pair) s = apply(s, { type: 'TOGGLE_EVIDENCE', id });
          s = apply(s, { type: 'CONNECT_EVIDENCE', relation });
          const inference = s.inferences[0];
          expect(inference.result).toBe(
            relation === 'uncertain'
              ? 'uncertain'
              : relation === expected[key]
                ? 'supported'
                : 'rejected',
          );
          expect(inference.relation).toBe(relation);
          expect(inference.pair).toBe(key);
          expect(inference.text.length).toBeGreaterThan(90);
          expect(s.opportunities).toBe(1);
          expect(s.relationships.credibility).toBe(0);
          expect(s.knowledge.includes('patent_conflict')).toBe(
            key === 'email|finance' && relation === 'conflict',
          );
          expect(evaluateRelation([...pair].reverse(), relation)).toEqual(
            evaluateRelation(pair, relation),
          );
          expect(act(s, { type: 'CONNECT_EVIDENCE', relation })).toBe(s);
        });
      }
  it('allows retry after an incorrect relationship without silently correcting it', () => {
    let s = toAnalysis();
    s = apply(s, { type: 'TOGGLE_EVIDENCE', id: 'email' });
    s = apply(s, { type: 'TOGGLE_EVIDENCE', id: 'finance' });
    s = apply(s, { type: 'CONNECT_EVIDENCE', relation: 'support' });
    expect(s.knowledge).not.toContain('patent_conflict');
    s = apply(s, { type: 'REQUEST_HINT' });
    s = apply(s, { type: 'CONNECT_EVIDENCE', relation: 'conflict' });
    expect(s.inferences.map((i) => i.result)).toEqual(['rejected', 'supported']);
    expect(s.relationships.credibility).toBe(0);
    expect(s.opportunities).toBe(1);
  });
});
describe('investigation and assessments', () => {
  for (const search of ['personnel', 'patents', 'payments'] as const)
    it(`spends once on ${search}, also after revising a weak draft`, () => {
      let s = apply(toAnalysis(), { type: 'REVIEW_ASSESSMENT', id: 'personnel' });
      s = apply(s, { type: 'REVISE_ASSESSMENT' });
      s = apply(s, { type: 'SPEND_INVESTIGATION', id: search });
      expect(s.investigation).toBe(search);
      expect(s.opportunities).toBe(0);
      expect(s.feedback).toContain('0 opportunities remain');
      for (const id of ['personnel', 'patents', 'payments'] as const)
        expect(act(s, { type: 'SPEND_INVESTIGATION', id })).toBe(s);
      expect(s.knowledge.includes('voss_connection')).toBe(search === 'personnel');
      expect(s.npcs.maya.known).not.toContainEqual(
        expect.objectContaining({ key: 'voss_connection' }),
      );
    });
  for (const [assessment, conflict, quality] of [
    ['bounded', true, 'supported'],
    ['personnel', true, 'weak'],
    ['data', true, 'weak'],
    ['fraud', true, 'incorrect'],
    ['insufficient', false, 'unresolved'],
    ['insufficient', true, 'supported'],
  ] as const)
    it(`${assessment}/${conflict}: ${quality} advances and records consequence`, () => {
      const s = toMaya({ assessment, conflict });
      expect(s.report?.quality).toBe(quality);
      expect(s.report?.assessment).toBe(assessment);
      expect(nodeOf(s)).toBe('maya.promotion');
      expect(s.relationships.credibility).toBe(quality === 'supported' ? 0 : -1);
      expect(s.opportunities).toBe(0);
      expect(s.npcs.benton.known.some((k) => k.source === 'Adrian submits the Helix report')).toBe(
        true,
      );
      expect(s.npcs.sloane).toEqual({ known: [], beliefs: [] });
      expect(s.npcs.marcus).toEqual({ known: [], beliefs: [] });
      expect(nodeOf(finish(s))).toBe('ending.complete');
    });
  it('limits knowledge disclosure and keeps every NPC observation sourced', () => {
    const privateRun = finish(toMaya({ search: 'personnel' }));
    expect(privateRun.npcs.maya.known.some((k) => k.key === 'voss_connection')).toBe(false);
    let s = toMaya({ search: 'personnel' });
    s = choice(s, 'mayaPromotion.hurt');
    s = choice(s, 'invitation.yes');
    s = choice(s, 'disclosure.voss');
    expect(s.npcs.maya.known.some((k) => k.key === 'voss_connection')).toBe(true);
    for (const npc of Object.values(s.npcs))
      for (const item of [...npc.known, ...npc.beliefs]) {
        expect(item.source.length).toBeGreaterThan(5);
        expect(s.ledger[item.event - 1]).toBeDefined();
      }
    let unearned = toMaya({ conflict: false, assessment: 'insufficient' });
    unearned = choice(unearned, 'mayaPromotion.fine');
    unearned = choice(unearned, 'invitation.no');
    expect(availableChoices(unearned).map((c) => c.id)).toEqual([
      'disclosure.private',
      'disclosure.nothing',
    ]);
    expect(act(unearned, { type: 'CHOOSE_DIALOGUE', id: 'disclosure.voss' })).toBe(unearned);
    expect(act(unearned, { type: 'CHOOSE_DIALOGUE', id: 'disclosure.contradiction' })).toBe(
      unearned,
    );
  });
});
