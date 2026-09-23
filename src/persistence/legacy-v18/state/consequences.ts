import { consequenceRules } from '../content/consequence-rules';
import { decodeSave, encodeSave } from '../../saves';
import { initialState, reducer } from './reducer';
import type { GameState } from './schema';
import {
  CONSEQUENCE_RULESET,
  ConsequenceSchema,
  ConsequenceViewSchema,
  type Consequence,
  type RelationshipView,
  type LeverageRecord,
} from './consequence-schema';

/** Read-only, authenticated prefix replay. Never derive an earlier view from a later snapshot. */
export function deriveConsequences(state: GameState, throughRevision = state.revision) {
  const authenticated = decodeSave(encodeSave(state));
  if (
    !Number.isInteger(throughRevision) ||
    throughRevision < 0 ||
    throughRevision > authenticated.revision
  )
    throw Error('Invalid consequence revision');
  const consequences: Consequence[] = [];
  const relationships = new Map<string, RelationshipView>();
  const leverage = new Map<string, LeverageRecord>();
  const ids = new Set<string>();
  let before = initialState(authenticated.contentRevision ?? 11);
  for (const event of authenticated.ledger.slice(0, throughRevision)) {
    const after = reducer(before, event.action);
    if (after === before || after.revision !== event.sequence)
      throw Error('Invalid consequence replay');
    for (const rule of consequenceRules)
      for (const candidate of rule.evaluate({ before, after, event })) {
        const effect = ConsequenceSchema.parse(candidate);
        if (
          ids.has(effect.id) ||
          effect.ruleId !== rule.id ||
          effect.sourceEvent !== event.sequence
        )
          throw Error('Invalid consequence provenance');
        for (const ref of effect.supportingRecords) {
          if (
            ref.sourceEvent > event.sequence ||
            !after.ledger.some((e) => e.sequence === ref.sourceEvent)
          )
            throw Error('Uncommitted consequence source');
          if (
            ref.kind === 'consequence' &&
            !consequences.some((e) => e.id === ref.key && e.sourceEvent === ref.sourceEvent)
          )
            throw Error('Missing prior consequence');
        }
        if (effect.kind === 'relationship-change' || effect.kind === 'relationship-signal') {
          const key = `${effect.sourceCharacter}:${effect.targetCharacter}`;
          const view = relationships.get(key) ?? {
            sourceCharacter: effect.sourceCharacter,
            targetCharacter: effect.targetCharacter,
            dimensions: {},
            signals: [],
          };
          if (effect.kind === 'relationship-signal')
            view.signals.push({
              dimension: effect.dimension,
              signal: effect.signal,
              effectId: effect.id,
            });
          else {
            const previous = view.dimensions[effect.dimension];
            const effects = [...(previous?.effects ?? []), effect.id];
            if (effect.value.mode === 'absolute')
              view.dimensions[effect.dimension] = {
                mode: 'absolute',
                level: effect.value.level,
                effects,
              };
            else if (previous?.mode === 'absolute')
              view.dimensions[effect.dimension] = {
                mode: 'absolute',
                level: previous.level + effect.value.amount,
                effects,
              };
            else
              view.dimensions[effect.dimension] = {
                mode: 'delta-only',
                mappedChange: (previous?.mappedChange ?? 0) + effect.value.amount,
                effects,
              };
          }
          relationships.set(key, view);
        } else if (effect.kind === 'leverage-created') {
          if (leverage.has(effect.leverageId)) throw Error('Duplicate leverage');
          leverage.set(effect.leverageId, {
            id: effect.leverageId,
            holder: effect.holder,
            subject: effect.subject,
            relatedCharacter: effect.relatedCharacter,
            sourceEvent: effect.sourceEvent,
            ruleId: effect.ruleId,
            basis: effect.basis,
            validity: effect.validity,
            supportingRecords: effect.supportingRecords,
            status: 'available',
            transitions: [
              { status: 'available', effectId: effect.id, sourceEvent: effect.sourceEvent },
            ],
            knowledge: [],
          });
        } else {
          const record = leverage.get(effect.leverageId);
          if (!record) throw Error('Missing leverage source');
          if (effect.kind === 'leverage-status') {
            record.status = effect.status;
            record.transitions.push({
              status: effect.status,
              effectId: effect.id,
              sourceEvent: effect.sourceEvent,
            });
          } else if (effect.kind === 'leverage-knowledge')
            record.knowledge.push({
              characterId: effect.recipient,
              effectId: effect.id,
              sourceEvent: effect.sourceEvent,
            });
        }
        ids.add(effect.id);
        consequences.push(effect);
      }
    before = after;
  }
  return ConsequenceViewSchema.parse({
    ruleset: CONSEQUENCE_RULESET,
    throughRevision,
    consequences,
    relationships: [...relationships.values()],
    leverage: [...leverage.values()],
  });
}
