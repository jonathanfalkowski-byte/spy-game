import { createHash } from 'node:crypto';
import { characters } from '../../content/characters';
import { CharacterSchema, adultEligibility, type Character } from '../../content/character-schema';
import { consequenceRules } from '../../content/consequence-rules';
import { deriveConsequences } from '../../state/consequences';
import { decodeSave, encodeSave } from '../../persistence/saves';
import { replay, nodeOf } from '../../state/reducer';
import { playerView, identityDisplayName } from '../../state/player';
import type { GameState } from '../../state/schema';
import { projectNarratorContext } from '../context';
import {
  AdultSceneSpecSchema,
  OutcomeContractSchema,
  HandoffPolicySchema,
  type AdultSceneSpec,
  type OutcomeContract,
  type HandoffPolicy,
} from './schema';

export const MAX_SPEC_BYTES = 96000;
export const productionOutcomes: readonly OutcomeContract[] = Object.freeze([]);
function canonical(value: unknown): string {
  if (Array.isArray(value)) return '[' + value.map(canonical).join(',') + ']';
  if (value && typeof value === 'object')
    return (
      '{' +
      Object.entries(value)
        .filter(([, v]) => v !== undefined)
        .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
        .map(([k, v]) => JSON.stringify(k) + ':' + canonical(v))
        .join(',') +
      '}'
    );
  return JSON.stringify(value);
}
export const hashText = (value: string) => createHash('sha256').update(value, 'utf8').digest('hex');
export const hashContract = (value: unknown) => hashText(canonical(value));
export function immutable<T>(value: T): T {
  if (value && typeof value === 'object') {
    for (const child of Object.values(value)) immutable(child);
    Object.freeze(value);
  }
  return value;
}
function unique(values: readonly string[], label: string) {
  if (new Set(values).size !== values.length) throw Error('Duplicate ' + label);
}
const mandatoryRestrictions = [
  'Do not change agency, authorization, refusal, withdrawal, willingness or pressure.',
  'Do not change motivations, relationships, mission outcomes, leverage, memory or canonical facts.',
  'Do not invent disclosures, secrets, knowledge, identity acceptance or historical identity ownership.',
  'End at the authored aftermath boundary. Prose never commits game actions.',
];
const mandatoryNonDisclosure = [
  {
    category: 'identity-association' as const,
    directive:
      'Do not reveal an underlying identity association or private identity acceptance beyond explicitly authorized presentation.',
  },
  {
    category: 'leverage-source' as const,
    directive: 'Do not reveal any leverage source absent from the authorized disclosures.',
  },
  {
    category: 'secret-objective' as const,
    directive: 'Do not reveal private objectives absent from the authorized disclosures.',
  },
  {
    category: 'unverified-history' as const,
    directive: 'Do not present an unverified historical claim as verified biography.',
  },
];

/** Trusted local authoring input only. No external draft may supply this registry or policy. */
export function createHandoffWorkspace(
  state: GameState,
  input: unknown,
  policyInput: unknown,
  catalog: readonly Character[] = characters,
) {
  const snapshot = decodeSave(encodeSave(state));
  const outcome = immutable(OutcomeContractSchema.parse(input));
  const policy = immutable(HandoffPolicySchema.parse(policyInput));
  const canon = CharacterSchema.array().parse(catalog);
  unique(
    canon.map((c) => c.id),
    'canonical character',
  );
  const participants = outcome.participants.map((p) => p.characterId);
  unique(participants, 'participant');
  if (outcome.entryNode !== nodeOf(snapshot)) throw Error('Stale outcome entry');
  const participantSet = new Set<string>(participants);
  const sources = new Map(outcome.sources.map((s) => [s.id, s]));
  unique(
    outcome.sources.map((s) => s.id),
    'source',
  );
  unique(
    outcome.authoredFacts.map((f) => f.id),
    'authored fact',
  );
  unique(
    outcome.requiredBeats.map((b) => b.id),
    'beat',
  );
  unique(
    outcome.informationDisclosures.map((d) => d.id),
    'disclosure',
  );
  unique(
    outcome.presentations.map((p) => p.variant),
    'presentation',
  );
  const derived = deriveConsequences(snapshot);
  const prefixes = new Map<number, GameState>([
    [0, replay([])],
    [snapshot.revision, snapshot],
  ]);
  const prefix = (revision: number) => {
    if (revision > snapshot.revision) throw Error('Future knowledge source');
    let value = prefixes.get(revision);
    if (!value) {
      value = replay(snapshot.ledger.slice(0, revision));
      prefixes.set(revision, value);
    }
    return value;
  };
  for (const source of outcome.sources) {
    const ref = source.reference;
    switch (ref.kind) {
      case 'event':
        if (!snapshot.ledger.some((e) => e.sequence === ref.sequence))
          throw Error('Unknown source event');
        break;
      case 'observation': {
        const o = ref.observation;
        if (
          !snapshot.npcs[o.characterId][o.layer].some(
            (r) => r.key === o.key && r.source === o.source && r.event === o.event,
          )
        )
          throw Error('Unknown sourced observation');
        break;
      }
      case 'player-knowledge':
        if (
          !prefix(ref.event).knowledge.includes(ref.key) ||
          (ref.event > 0 && prefix(ref.event - 1).knowledge.includes(ref.key))
        )
          throw Error('Unknown knowledge acquisition');
        break;
      case 'leverage':
        if (!derived.leverage.some((r) => r.id === ref.recordId))
          throw Error('Unknown leverage source');
        break;
      case 'consequence':
        if (!derived.consequences.some((r) => r.id === ref.recordId))
          throw Error('Unknown consequence source');
        break;
      case 'consequence-rule':
        if (!consequenceRules.some((r) => r.id === ref.ruleId))
          throw Error('Unknown authored consequence rule');
        break;
      case 'authored-fact':
        if (!outcome.authoredFacts.some((f) => f.id === ref.factId))
          throw Error('Unknown authored fact');
        break;
    }
  }
  const requireSources = (values: readonly string[]) => {
    unique(values, 'reference');
    for (const id of values) if (!sources.has(id)) throw Error('Unresolved source reference');
  };
  requireSources(outcome.entryState);
  requireSources(outcome.exitState);
  requireSources(outcome.requiredFacts);
  for (const beat of outcome.requiredBeats) {
    requireSources(beat.sourceIds);
    unique(
      beat.agency.map((a) => a.characterId),
      'beat participant',
    );
    if (beat.agency.length !== participants.length)
      throw Error('Every participant needs authored agency at every beat');
    for (const agency of beat.agency) {
      if (!participantSet.has(agency.characterId)) throw Error('Unknown agency participant');
      requireSources([
        ...new Set([
          agency.sourceId,
          agency.authorization.sourceId,
          ...agency.pressures.map((p) => p.sourceId),
        ]),
      ]);
      for (const pressure of agency.pressures)
        for (const id of pressure.knownTo)
          if (!participantSet.has(id)) throw Error('Unknown pressure recipient');
    }
  }
  // Temporal agency is supplied at every beat. A revoked authorization cannot silently reappear.
  for (const characterId of participants) {
    const usedSources = new Set<string>();
    let needsFreshAuthorization = false;
    for (const beat of outcome.requiredBeats) {
      const agency = beat.agency.find((a) => a.characterId === characterId)!;
      if (agency.authorization.status === 'granted') {
        if (needsFreshAuthorization && usedSources.has(agency.authorization.sourceId))
          throw Error('Renewed authorization requires a distinct authored source');
        needsFreshAuthorization = false;
      }
      if (
        agency.withdrawal === 'expressed' ||
        agency.refusal === 'expressed' ||
        agency.authorization.status === 'revoked'
      )
        needsFreshAuthorization = true;
      usedSources.add(agency.authorization.sourceId);
    }
  }
  unique(
    policy.writerFacts.map((f) => f.id),
    'writer fact',
  );
  const writerFacts = new Map(policy.writerFacts.map((f) => [f.id, f]));
  for (const fact of policy.writerFacts) {
    if (fact.id !== fact.sourceId) throw Error('Writer fact must retain its source reference ID');
    requireSources([fact.sourceId]);
  }
  for (const id of outcome.requiredFacts)
    if (writerFacts.get(id)?.visibility !== 'may-reveal')
      throw Error('Required fact is not available for presentation');
  for (const d of outcome.informationDisclosures) {
    if (!participantSet.has(d.from) || d.to.some((id) => !participantSet.has(id)))
      throw Error('Unknown disclosure participant');
    unique(d.to, 'disclosure recipient');
    if (
      !outcome.requiredBeats.some((b) => b.id === d.beatId) ||
      writerFacts.get(d.factId)?.visibility !== 'may-reveal' ||
      !outcome.exitState.includes(d.factId)
    )
      throw Error('Unresolved disclosure boundary');
  }
  for (const restriction of policy.doNotReveal)
    if (restriction.factId) {
      if (!sources.has(restriction.factId)) throw Error('Unknown non-disclosure reference');
      if (outcome.informationDisclosures.some((d) => d.factId === restriction.factId))
        throw Error('Disclosure contradicts non-disclosure');
    }
  for (const presentation of outcome.presentations) {
    unique(presentation.omittedBeatIds, 'omitted beat');
    for (const id of presentation.omittedBeatIds)
      if (!outcome.requiredBeats.some((b) => b.id === id)) throw Error('Unknown omitted beat');
    unique(
      presentation.disclosureDelivery.map((d) => d.disclosureId),
      'disclosure delivery',
    );
    if (presentation.disclosureDelivery.length !== outcome.informationDisclosures.length)
      throw Error('Missing disclosure delivery');
    for (const delivery of presentation.disclosureDelivery) {
      const d = outcome.informationDisclosures.find((d) => d.id === delivery.disclosureId);
      if (!d) throw Error('Unknown disclosure delivery');
      if (delivery.via === 'scene' && presentation.omittedBeatIds.includes(d.beatId))
        throw Error('Omitted disclosure needs an authored delivery');
      if (
        delivery.via !== 'scene' &&
        (delivery.summaryFactId !== d.factId ||
          writerFacts.get(d.factId)?.visibility !== 'may-reveal')
      )
        throw Error('Missing authored disclosure summary');
    }
  }
  unique(
    policy.participantKnowledge.map((p) => p.characterId),
    'knowledge participant',
  );
  const participantKnowledge = policy.participantKnowledge.map((p) => {
    if (!participantSet.has(p.characterId)) throw Error('Unknown knowledge participant');
    requireSources(p.sourceIds);
    return {
      characterId: p.characterId,
      records: p.sourceIds.map((id) => {
        const source = sources.get(id)!;
        const ref = source.reference;
        if (
          !(ref.kind === 'observation' && ref.observation.characterId === p.characterId) &&
          !(ref.kind === 'player-knowledge' && p.characterId === 'player-character')
        )
          throw Error('Writer knowledge is not participant knowledge');
        return source;
      }),
    };
  });
  const projectedParticipants = outcome.participants.map((p) => {
    const character = canon.find((c) => c.id === p.characterId);
    if (!character || adultEligibility(character) !== 'adult')
      throw Error('Canonical adulthood required');
    if (
      p.personaId &&
      (p.characterId !== 'player-character' ||
        playerView(snapshot).presentation?.identityId !== p.personaId)
    )
      throw Error('Unestablished presented persona');
    return {
      ...p,
      displayName: p.personaId ? identityDisplayName(p.personaId) : character.displayName,
      adultEligibility: {
        status: 'adult' as const,
        source: 'Verified character-canon adulthood; not a persona age',
      },
    };
  });
  const narrative = policy.narrativeGrants.map((grant) =>
    projectNarratorContext(snapshot, grant, canon),
  );
  const outcomeHash = hashContract(outcome);
  const specs = new Map<string, AdultSceneSpec>();
  for (const presentation of outcome.presentations) {
    const {
      specificationVersion,
      writerFacts: _facts,
      participantKnowledge: _knowledge,
      narrativeGrants: _grants,
      doNotReveal: _restrictions,
      additionalForbiddenChanges: _forbidden,
      visiblePowerDirection,
      ...direction
    } = policy;
    const body = {
      contractVersion: 1 as const,
      sceneId: outcome.sceneId,
      sceneVariantId: outcome.sceneVariantId,
      specificationVersion,
      canonicalOutcomeId: outcome.canonicalOutcomeId,
      outcomeVersion: outcome.outcomeVersion,
      outcomeHash,
      binding: {
        node: nodeOf(snapshot),
        revision: snapshot.revision,
        ledgerHash: hashContract(snapshot.ledger),
      },
      participants: projectedParticipants,
      writerPermittedContext: {
        facts: policy.writerFacts.map(({ sourceId: _source, ...f }) => f),
        narrative,
        visiblePowerDirection,
      },
      participantKnowledge,
      agencyContext: outcome.requiredBeats.map((b) => ({
        beatId: b.id,
        classification: b.classification,
        participants: b.agency,
      })),
      requiredBeats: outcome.requiredBeats.map(({ id, direction }) => ({ id, direction })),
      requiredFacts: outcome.requiredFacts,
      informationDisclosures: outcome.informationDisclosures,
      entryState: outcome.entryState,
      exitState: outcome.exitState,
      aftermathId: outcome.aftermathId,
      forbiddenChanges: [...mandatoryRestrictions, ...policy.additionalForbiddenChanges],
      doNotReveal: [...mandatoryNonDisclosure, ...policy.doNotReveal],
      presentation,
      ...direction,
    };
    const spec = AdultSceneSpecSchema.parse({ ...body, specificationHash: hashContract(body) });
    if (Buffer.byteLength(JSON.stringify(spec), 'utf8') > MAX_SPEC_BYTES)
      throw Error('Specification exceeds byte budget');
    specs.set(presentation.variant, immutable(spec));
  }
  return Object.freeze({
    outcomeHash,
    outcomeVersion: outcome.outcomeVersion,
    issue(variant: string) {
      const spec = specs.get(variant);
      if (!spec) throw Error('Unknown presentation variant');
      return spec;
    },
    verify(specInput: unknown) {
      const spec = AdultSceneSpecSchema.parse(specInput);
      const expected = specs.get(spec.presentation.variant);
      if (!expected || hashContract(spec) !== hashContract(expected))
        throw Error('Stale or altered specification/outcome');
      return expected;
    },
  });
}
export type HandoffWorkspace = ReturnType<typeof createHandoffWorkspace>;
