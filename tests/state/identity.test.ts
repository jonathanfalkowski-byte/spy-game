import { expect, it } from 'vitest';
import { characters } from '../../src/content/characters';
import { identities, IdentitySchema } from '../../src/content/identities';
import {
  CharacterIdSchema,
  CharacterSchema,
  adultEligibility,
  NpcIdSchema,
} from '../../src/content/character-schema';
import { validateContent } from '../../src/content/validate';
import { initialState, nodeOf, replay } from '../../src/state/reducer';
import {
  playerBinding,
  playerView,
  characterForLegacyCustodian,
  earnedIdentityClaims,
  npcPersonaObservations,
  identityDisplayName,
} from '../../src/state/player';
import { projectNarratorContext, tryProjectNarratorContext } from '../../src/narrative/context';
import { missionStart, runMission } from '../mission-helpers';
import { clinicStart, traverse } from '../clinic-helpers';

const policy = (s = initialState()) => ({
  node: nodeOf(s),
  revision: s.revision,
  characterId: 'marcus',
  canon: [],
  playerKnowledge: [],
  npcObservations: [],
  beats: [],
});

it('has one player character and separate identities with canonical display spelling', () => {
  validateContent();
  expect(playerBinding).toEqual({ playerId: 'local-player', characterId: 'player-character' });
  expect(characters).toHaveLength(11);
  expect(characters.find((c) => c.id === 'rook')?.displayName).toBe('Unknown sender');
  expect(characters.find((c) => c.id === 'sebastian')?.canon.age).toMatchObject({ years: 38, status: 'established' });
  expect(characters.find((c) => c.id === playerBinding.characterId)?.displayName).toBe(
    'Evelynn Vale',
  );
  for (const id of ['adrian', 'evelyn', 'helix']) {
    expect(CharacterIdSchema.safeParse(id).success).toBe(false);
    expect(NpcIdSchema.safeParse(id).success).toBe(false);
  }
  expect(NpcIdSchema.safeParse('player-character').success).toBe(false);
  expect(identities.map((i) => i.id)).toEqual(['adrian', 'evelyn']);
  expect(identityDisplayName('evelyn')).toBe('Evelynn Vale');
  expect(identities.find((i) => i.id === 'evelyn')!.legacyIntroduction!.name).toBe('Evelyn Vale');
});

it('maintains the same playable subject through every prefix of the complete route', () => {
  const end = runMission();
  for (let i = 0; i <= end.ledger.length; i++) {
    const s = replay(end.ledger.slice(0, i));
    const before = JSON.stringify(s);
    expect(playerView(s).binding).toEqual(playerBinding);
    expect(JSON.stringify(s)).toBe(before);
  }
  expect(playerView(initialState()).presentation).toMatchObject({ identityId: 'adrian' });
  expect(playerView(end).presentation).toMatchObject({
    identityId: 'evelyn',
    context: 'operational',
  });
});

it('separates operational presentation, private reflection and spoken name response', () => {
  for (const name of ['answer', 'correct', 'defer']) {
    const clinicEnd = traverse(clinicStart(), { name: 'name.' + name, mirror: 'mirror.anger' });
    expect(playerView(clinicEnd).presentation).toBeNull();
    const s = runMission(clinicEnd);
    const view = playerView(s);
    expect(view.presentation?.identityId).toBe('evelyn');
    expect(view.privateInterpretation.mirrorChoice).toBe('mirror.anger');
    expect(view.spokenNameResponse?.choiceId).toBe('name.' + name);
    expect(view).not.toHaveProperty('identityAccepted');
    expect(view.privateInterpretation).not.toHaveProperty('acceptance');
    expect(view.privateInterpretation).not.toHaveProperty('consent');
  }
});

it('does not choose a new persona at treatment stops or from changed appearance', () => {
  for (const [overrides, stage] of [
    [{ authorization: 'stop.request', stopConfirm: 'stop.confirm' }, 'unchanged'],
    [{ voice: 'voice.pause', voicePause: 'stop.request', stopConfirm: 'stop.confirm' }, 'voice'],
    [{ face: 'face.pause', facePause: 'stop.request', stopConfirm: 'stop.confirm' }, 'face'],
  ] as const) {
    const s = traverse(clinicStart(), overrides);
    expect(s.clinic.stage).toBe(stage);
    expect(playerView(s).binding.characterId).toBe('player-character');
    expect(playerView(s).presentation?.identityId ?? null).toBe(
      stage === 'unchanged' ? 'adrian' : null,
    );
  }
});

it('keeps age eligibility on the actual person, not the claimed age of a cover', () => {
  const person = characters.find((c) => c.id === 'player-character')!;
  const persona = identities.find((i) => i.id === 'evelyn')!;
  expect(person.canon.age?.years).toBe(34);
  expect(persona.claimedAge?.years).toBe(31);
  expect(adultEligibility(person)).toBe('adult');
  expect(CharacterSchema.safeParse(persona).success).toBe(false);
  expect(IdentitySchema.safeParse({ ...persona, characterId: 'player-character' }).success).toBe(
    false,
  );
  const underage = CharacterSchema.parse({
    ...person,
    canon: { ...person.canon, age: { years: 17, status: 'established', source: 'Test fixture' } },
  });
  expect(adultEligibility(underage)).toBe('minor');
  // Possessing an adult persona cannot override the result.
  expect(persona.claimedAge?.years).toBe(31);
});

it('adapts legacy evidence custody without resolving NPC identity knowledge', () => {
  for (const value of ['Evelyn', 'evelyn'])
    expect(characterForLegacyCustodian(value)).toBe('player-character');
  expect(characterForLegacyCustodian('Sloane')).toBe('sloane');
  expect(characterForLegacyCustodian('benton')).toBe('benton');
  expect(characterForLegacyCustodian('none')).toBeNull();
  expect(characterForLegacyCustodian('helix')).toBeNull();
});

it('keeps historical identity records as earned attributed claims, never player biography', () => {
  expect(earnedIdentityClaims(initialState())).toEqual([]);
  const s = runMission();
  const claims = earnedIdentityClaims(s);
  expect(claims.map((c) => c.key)).toContain('mission.singapore');
  expect(claims.map((c) => c.key)).toContain('mission.celeste-greeting');
  for (const claim of claims) {
    expect(claim.layer).toBe('claim');
    expect(claim.identityId).toBe('evelyn');
    expect(claim).not.toHaveProperty('characterId');
    expect(claim).not.toHaveProperty('historicalBearer');
  }
  const context = projectNarratorContext(s, {
    ...policy(s),
    identityClaims: ['mission.singapore'],
  });
  expect(context.identityClaims).toEqual(claims.filter((c) => c.key === 'mission.singapore'));
  expect(() =>
    projectNarratorContext(initialState(), { ...policy(), identityClaims: ['mission.singapore'] }),
  ).toThrow('Unearned');
});

it('projects persona recognition without exposing the player/persona association', () => {
  const s = runMission(missionStart(), {}, 'celesteReply');
  const observations = npcPersonaObservations(s);
  expect(observations.map((o) => o.observerId)).toEqual(['marcus', 'celeste']);
  for (const observation of observations) {
    expect(observation.identityId).toBe('evelyn');
    expect(observation.layer).toBe('belief');
    expect(observation).not.toHaveProperty('bearer');
    expect(observation).not.toHaveProperty('characterId');
  }
  const base = projectNarratorContext(s, policy(s));
  expect(base.personaObservations).toEqual([]);
  expect(base.identityDisplays).toEqual([]);
  const context = projectNarratorContext(s, {
    ...policy(s),
    identityDisplays: ['evelyn'],
    personaObservations: [observations[0]],
    beats: ['Marcus leaves the shared recollection unspoken.'],
  });
  expect(context.identityDisplays).toEqual([{ identityId: 'evelyn', displayName: 'Evelynn Vale' }]);
  expect(context.personaObservations).toEqual([observations[0]]);
  expect(JSON.stringify(context)).not.toMatch(
    /player-character|Adrian|privateInterpretation|binding|mirror/,
  );
  expect(() =>
    projectNarratorContext(s, {
      ...policy(s),
      personaObservations: [{ ...observations[0], event: 9999 }],
    }),
  ).toThrow('Unauthorized');
  expect(() =>
    projectNarratorContext(initialState(), { ...policy(), identityDisplays: ['evelyn'] }),
  ).toThrow('Unearned');
});

it('fails closed to authored behavior without accepting model-supplied mutations', () => {
  const state = initialState(),
    before = JSON.stringify(state);
  expect(tryProjectNarratorContext(state, policy()).kind).toBe('projected');
  for (const mutation of [
    { revision: 1 },
    { requestedChanges: { consent: true } },
    { binding: playerBinding },
  ])
    expect(tryProjectNarratorContext(state, { ...policy(), ...mutation })).toEqual({
      kind: 'authored-fallback',
    });
  expect(JSON.stringify(state)).toBe(before);
});
