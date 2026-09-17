/** Offline authored adapter. Runtime outcomes remain owned by the reducer. */
import type { GameState } from '../../state/schema';
import { get4, read4 } from '../../content/chapter4-model';
import { intimacyEligible4 } from '../../content/chapter4-power';
import { createHandoffWorkspace } from './handoff';
import type { OutcomeContract, HandoffPolicy } from './schema';
export function createChapter4Handoff(state: GameState) {
  if (
    state.contentRevision !== 15 ||
    state.scene !== 'chapter4' ||
    state.phase !== 'handoff' ||
    !intimacyEligible4(state) ||
    get4(state, 'authorization') !== 'granted'
  )
    throw Error('No current Chapter 4 intimate handoff authorization');
  const ids = ['player-character', 'julian-mercer'] as const;
  const authorization = read4(state, 'authorization')!;
  const motive = read4(state, 'private-motive')!;
  const interest = read4(state, 'julian-interest')!;
  const outcome = get4(state, 'planned-outcome')!;
  const role =
    'Julian Mercer is 49 and Helix Group COO. Evelynn is an adult, age 34. A completed paid engagement creates professional authority context; no threat, coercion, dependency, personal payment condition, affection or trust is established.';
  const aftermath =
    'End after the agreed private time. No future work, personal commitment, identity disclosure or dependency is created. Earned income and independent access remain unchanged.';
  const contract: OutcomeContract = {
    canonicalOutcomeId: 'chapter4.' + outcome,
    outcomeVersion: 1,
    sceneId: 'chapter4.private-time',
    sceneVariantId: 'chapter4.' + get4(state, 'scope'),
    entryNode: 'chapter4.handoff',
    aftermathId: 'chapter4.private-access',
    participants: [
      { characterId: 'player-character', personaId: 'evelyn' },
      { characterId: 'julian-mercer' },
    ],
    authoredFacts: [
      { id: 'role', kind: 'agency', summary: role },
      { id: 'aftermath', kind: 'boundary', summary: aftermath },
    ],
    sources: [
      { id: 'authorization', reference: { kind: 'event', sequence: authorization.event } },
      {
        id: 'private-motive',
        reference: { kind: 'player-knowledge', key: 'c4.private-motive', event: motive.event },
      },
      {
        id: 'julian-authorization',
        reference: {
          kind: 'delivery',
          characterId: 'julian-mercer',
          key: 'sent-' + authorization.event + '-julian-mercer',
          event: authorization.event,
        },
      },
      {
        id: 'player-authorization',
        reference: {
          kind: 'player-knowledge',
          key: 'c4.authorization',
          event: authorization.event,
        },
      },
      { id: 'mutual-interest', reference: { kind: 'event', sequence: interest.event } },
      { id: 'role', reference: { kind: 'authored-fact', factId: 'role' } },
      { id: 'aftermath', reference: { kind: 'authored-fact', factId: 'aftermath' } },
    ],
    entryState: ['authorization', 'mutual-interest', 'private-motive', 'role'],
    exitState: ['aftermath'],
    requiredBeats: [
      'Confirm the current boundary; either participant may stop.',
      'Fade to black within the authorized scope. Do not depict graphic activity.',
      'Close at the authored aftermath without a new promise.',
    ].map((direction, i) => ({
      id: 'beat-' + i,
      direction,
      classification: 'mutually-willing',
      sourceIds: ['authorization', 'role', 'aftermath'],
      agency: ids.map((characterId) => ({
        characterId,
        sourceId: 'authorization',
        willingness: 'willing',
        authorization: { status: 'granted', scope: authorization.text, sourceId: 'authorization' },
        refusal: 'not-established',
        withdrawal: 'not-established',
        participation: 'participating',
        pressures: [{ kind: 'authority', sourceId: 'role', knownTo: [...ids] }],
      })),
    })),
    requiredFacts: ['authorization', 'aftermath'],
    informationDisclosures: [],
    presentations: [{ variant: 'fade_to_black', omittedBeatIds: [], disclosureDelivery: [] }],
  };
  const policy: HandoffPolicy = {
    specificationVersion: 1,
    writerFacts: [
      {
        id: 'authorization',
        sourceId: 'authorization',
        text: authorization.text,
        visibility: 'may-reveal',
      },
      {
        id: 'private-motive',
        sourceId: 'private-motive',
        text: motive.text,
        visibility: 'writer-only',
      },
      {
        id: 'mutual-interest',
        sourceId: 'mutual-interest',
        text: interest.text,
        visibility: 'may-reveal',
      },
      { id: 'role', sourceId: 'role', text: role, visibility: 'writer-only' },
      { id: 'aftermath', sourceId: 'aftermath', text: aftermath, visibility: 'may-reveal' },
    ],
    participantKnowledge: ids.map((characterId) => ({
      characterId,
      sourceIds:
        characterId === 'player-character'
          ? ['player-authorization', 'private-motive']
          : ['julian-authorization'],
    })),
    narrativeGrants: [],
    doNotReveal: [
      {
        category: 'secret-objective',
        directive: 'Do not disclose Evelynn’s private motive to Julian.',
        factId: 'private-motive',
      },
    ],
    additionalForbiddenChanges: [
      'Attraction is not affection, trust, willingness or authorization. Do not infer one from another.',
      'The engine can revoke authorization before committing any encounter. This export is not a game action.',
    ],
    visiblePowerDirection: [role],
    location: 'A mutually agreed private hotel guest room above the café',
    time: '20:30, after the completed work day',
    tone: 'Adult, bounded, non-graphic',
    scenePurpose: 'An earned optional private encounter, separate from professional reward.',
    language: 'en',
    visualAssetSpecIds: ['chapter4-private-time-pending'],
  };
  return createHandoffWorkspace(state, contract, policy);
}
