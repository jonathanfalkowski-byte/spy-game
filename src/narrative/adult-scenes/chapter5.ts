/** Offline authored adapter. Runtime outcomes remain owned by the reducer. */
import type { GameState } from '../../state/schema';
import { get5, read5 } from '../../content/chapter5-model';
import { intimate5 } from '../../content/chapter5-desire';
import { createHandoffWorkspace } from './handoff';
import type { OutcomeContract, HandoffPolicy } from './schema';
export function createChapter5Handoff(state: GameState) {
  if (
    state.contentRevision !== 16 ||
    state.scene !== 'chapter5' ||
    state.phase !== 'handoff' ||
    !intimate5(state) ||
    get5(state, 'authorization') !== 'granted'
  )
    throw Error('No current Chapter 5 intimate handoff authorization');
  const ids = ['player-character', 'julian-mercer'] as const;
  const authorization = read5(state, 'authorization')!;
  const motive = read5(state, 'private-motive')!;
  const interest = read5(state, 'current-interest')!;
  const outcome = get5(state, 'planned-outcome')!;
  const role =
    'Julian Mercer is 49 and Helix Group COO. Evelynn is an adult, age 34. A completed paid engagement creates professional authority context; no threat, coercion, dependency, personal payment condition, affection or trust is established.';
  const aftermath =
    'End after the agreed private time. No future work, personal commitment, identity disclosure or dependency is created. Earned income and independent access remain unchanged.';
  const contract: OutcomeContract = {
    canonicalOutcomeId: 'chapter5.' + outcome,
    outcomeVersion: 1,
    sceneId: 'chapter5.private-time',
    sceneVariantId: 'chapter5.' + get5(state, 'scope'),
    entryNode: 'chapter5.handoff',
    aftermathId: 'chapter5.return',
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
        reference: { kind: 'player-knowledge', key: 'c5.private-motive', event: motive.event },
      },
      {
        id: 'julian-authorization',
        reference: {
          kind: 'delivery',
          characterId: 'julian-mercer',
          key: 'c5.sent-' + authorization.event + '-julian-mercer',
          event: authorization.event,
        },
      },
      {
        id: 'player-authorization',
        reference: {
          kind: 'player-knowledge',
          key: 'c5.authorization',
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
    location: 'A mutually agreed private guest room at the hotel beside Helix',
    time: '20:30, after the chosen public and professional day',
    tone: 'Adult, bounded, non-graphic',
    scenePurpose: 'An earned optional private encounter, separate from professional reward.',
    language: 'en',
    visualAssetSpecIds: ['chapter5-private-time-pending'],
  };
  return createHandoffWorkspace(state, contract, policy);
}
