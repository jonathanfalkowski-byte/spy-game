import { readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { characters, presentedIdentityIntroduction } from '../../src/content/characters';
import { characters as originalCharacters } from '../../src/persistence/legacy-v8/content/characters';
import { adultEligibility, CharacterSchema } from '../../src/content/character-schema';
import { initialState, nodeOf, replay } from '../../src/state/reducer';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { projectNarratorContext, type BeatProjection } from '../../src/narrative/context';
import { toMaya } from '../helpers';

const maya = characters.find((c) => c.id === 'maya')!;
const plan = (state = initialState()): BeatProjection => ({
  node: nodeOf(state),
  revision: state.revision,
  characterId: 'maya',
  canon: [],
  playerKnowledge: [],
  npcObservations: [],
  identityDisplays: [],
  identityClaims: [],
  personaObservations: [],
  beats: [],
});

describe('character canon without new story facts', () => {
  it('preserves every existing introduction including Maya verbatim', () => {
    const preserved = [...characters.map((c) => c.introduction), presentedIdentityIntroduction];
    for (const introduction of originalCharacters)
      expect(preserved.find((c) => c.id === introduction.id)).toEqual(introduction);
    for (const character of characters)
      expect(CharacterSchema.safeParse(character).success).toBe(true);
    expect(maya.canon.facts.map((f) => f.text)).toEqual([
      maya.introduction.name,
      maya.introduction.role,
      maya.introduction.appearance,
      maya.introduction.history,
    ]);
  });
  it('leaves unspecified private and romantic information absent', () => {
    expect(maya.canon).not.toHaveProperty('secrets');
    expect(maya.canon).not.toHaveProperty('objectives');
    expect(maya.canon).not.toHaveProperty('attraction');
    expect(maya.canon).not.toHaveProperty('allegiance');
    expect(characters.find((c) => c.id === 'celeste')!.canon).not.toHaveProperty('age');
    expect(CharacterSchema.safeParse({ ...maya, attraction: 80 }).success).toBe(false);
  });
  it('requires established adult age, not a presented identity or an assumption', () => {
    expect(adultEligibility(maya)).toBe('adult');
    expect(adultEligibility(characters.find((c) => c.id === 'player-character')!)).toBe('adult');
    expect(adultEligibility(characters.find((c) => c.id === 'celeste')!)).toBe('unknown');
    for (const years of [17, 18]) {
      const c = CharacterSchema.parse({
        ...maya,
        canon: { ...maya.canon, age: { years, status: 'established', source: 'Test fixture' } },
      });
      expect(adultEligibility(c)).toBe(years === 17 ? 'minor' : 'adult');
    }
    expect(
      CharacterSchema.safeParse({
        ...maya,
        canon: { ...maya.canon, age: { years: -1, status: 'established', source: 'Test' } },
      }).success,
    ).toBe(false);
    expect(
      CharacterSchema.safeParse({
        ...maya,
        canon: { ...maya.canon, facts: [...maya.canon.facts, maya.canon.facts[0]] },
      }).success,
    ).toBe(false);
  });
});

describe('information firewall', () => {
  it('exports nothing automatically and never serializes private canon', () => {
    const state = toMaya();
    const catalog = [
      CharacterSchema.parse({
        ...maya,
        canon: {
          ...maya.canon,
          secrets: [{ id: 'secret', text: 'SECRET_SENTINEL', source: 'PRIVATE_SOURCE' }],
          objectives: [{ id: 'objective', text: 'OBJECTIVE_SENTINEL', source: 'PRIVATE_SOURCE' }],
        },
      }),
    ];
    const before = JSON.stringify(state);
    const policy = { ...plan(state), beats: ['Maya studies Adrian before replying.'] };
    const context = projectNarratorContext(state, policy, catalog);
    expect(context).toEqual({ ...policy, canon: [], playerKnowledge: [], npcObservations: [] });
    expect(JSON.stringify(context)).not.toMatch(/SENTINEL|PRIVATE_SOURCE|mayaTrust|history|bond/);
    for (const factId of ['secret', 'objective'])
      expect(() =>
        projectNarratorContext(
          state,
          { ...policy, canon: [{ factId, requiresPlayerKnowledge: 'maya_history' }] },
          catalog,
        ),
      ).toThrow('Unprojectable');
    expect(JSON.stringify(state)).toBe(before);
  });
  it('includes only selected earned facts and protagonist knowledge', () => {
    const state = initialState();
    const context = projectNarratorContext(state, {
      ...plan(state),
      canon: [{ factId: 'background', requiresPlayerKnowledge: 'maya_history' }],
      playerKnowledge: ['maya_history'],
    });
    expect(context.canon).toEqual([maya.canon.facts.find((f) => f.id === 'background')]);
    expect(context.playerKnowledge).toEqual(['maya_history']);
    expect(context).not.toHaveProperty('age');
    expect(() =>
      projectNarratorContext(state, { ...plan(state), playerKnowledge: ['voss_connection'] }),
    ).toThrow('Unearned');
    expect(() =>
      projectNarratorContext(state, {
        ...plan(state),
        canon: [{ factId: 'occupation', requiresPlayerKnowledge: 'voss_connection' }],
      }),
    ).toThrow('Unearned');
  });
  it('requires exact explicit NPC grants and preserves the belief distinction', () => {
    const state = toMaya();
    expect(state.npcs.maya.known.length).toBeGreaterThan(0);
    expect(projectNarratorContext(state, plan(state)).npcObservations).toEqual([]);
    for (const [characterId, layer] of [
      ['maya', 'known'],
      ['daniel', 'beliefs'],
    ] as const) {
      const observation = state.npcs[characterId][layer][0];
      expect(observation).toBeDefined();
      const grant = { characterId, layer, ...observation };
      const context = projectNarratorContext(state, { ...plan(state), npcObservations: [grant] });
      expect(context.npcObservations).toEqual([grant]);
      for (const mutation of [
        { source: 'invented' },
        { event: 9999 },
        { key: 'invented' },
        { layer: layer === 'known' ? 'beliefs' : 'known' },
      ])
        expect(() =>
          projectNarratorContext(state, {
            ...plan(state),
            npcObservations: [{ ...grant, ...mutation }],
          }),
        ).toThrow('Unauthorized');
    }
  });
  it('rejects stale, malformed, unknown and oversized projections', () => {
    const state = initialState();
    for (const mutation of [
      { revision: 1 },
      { node: 'maya.case' },
      { characterId: 'invented' },
      { secrets: true },
      { requestedChanges: { trust: 4 } },
      { playerKnowledge: Array(13).fill('maya_history') },
      { beats: ['x'.repeat(501)] },
    ])
      expect(() => projectNarratorContext(state, { ...plan(state), ...mutation })).toThrow();
    expect(() => projectNarratorContext(state, plan(state), [])).toThrow();
    const large = CharacterSchema.parse({
      ...maya,
      canon: { ...maya.canon, facts: [{ id: 'large', text: '界'.repeat(2000), source: 'source' }] },
    });
    expect(() =>
      projectNarratorContext(
        state,
        {
          ...plan(state),
          canon: Array(8).fill({ factId: 'large', requiresPlayerKnowledge: 'maya_history' }),
        },
        [large],
      ),
    ).toThrow('byte budget');
  });
});

it('replays every existing review endpoint exactly with unchanged schema 5/content 9', () => {
  const directory = new URL('../../review-saves/', import.meta.url);
  const files = readdirSync(directory).filter((name) => /^\d.*\.json$/.test(name));
  expect(files.length).toBe(13);
  for (const file of files) {
    const original = JSON.parse(
      readFileSync(new URL(file, directory), 'utf8').replace(/^\uFEFF/, ''),
    );
    const loaded = decodeSave(JSON.stringify(original));
    expect(loaded).toEqual(original.state);
    expect(replay(loaded.ledger)).toEqual(original.state);
    expect(JSON.parse(encodeSave(loaded))).toEqual(original);
  }
}, 30000);
