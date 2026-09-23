import type { GameState } from '../state/schema';
import type { GameEvent } from '../state/actions';
import type { Consequence, SupportingRecord } from '../state/consequence-schema';
import { nodeOf } from '../state/reducer';

type Frame = { before: GameState; after: GameState; event: GameEvent };
type Rule = {
  id: string;
  semantics: 'delta-only' | 'sourced-signal' | 'sourced-power' | 'callback';
  evaluate: (frame: Frame) => Consequence[];
};
function meta(
  f: Frame,
  ruleId: string,
  slot: string,
  actor: Consequence['actor'],
  affectedCharacter: Consequence['affectedCharacter'],
  supportingRecords: SupportingRecord[],
) {
  return {
    id: `${f.event.sequence}:${ruleId}:${slot}`,
    ruleId,
    sourceEvent: f.event.sequence,
    actor,
    affectedCharacter,
    supportingRecords,
  };
}
function actionIs(f: Frame, type: string, id: string) {
  return f.event.action.type === type && 'id' in f.event.action && f.event.action.id === id;
}
function actionRef(f: Frame): SupportingRecord {
  return {
    kind: 'event',
    key: 'id' in f.event.action ? f.event.action.id : f.event.action.type,
    sourceEvent: f.event.sequence,
    source: 'Committed action ledger',
  };
}
function trustRule(
  id: string,
  type: string,
  action: string,
  node: string,
  amount: number,
  record: (f: Frame) => SupportingRecord | undefined,
): Rule {
  return {
    id,
    semantics: 'delta-only',
    evaluate(f) {
      if (!actionIs(f, type, action) || nodeOf(f.before) !== node) return [];
      const supporting = record(f);
      if (
        !supporting ||
        f.after.relationships.mayaTrust - f.before.relationships.mayaTrust !== amount
      )
        throw Error('Authored trust rule no longer matches its source');
      return [
        {
          ...meta(f, id, 'trust', 'player-character', 'maya', [actionRef(f), supporting]),
          kind: 'relationship-change',
          sourceCharacter: 'maya',
          targetCharacter: 'player-character',
          dimension: 'trust',
          value: { mode: 'delta-only', amount },
        },
      ];
    },
  };
}
function npcRef(
  f: Frame,
  owner: 'maya' | 'sloane',
  layer: 'known' | 'beliefs',
  key: string,
  source: string,
): SupportingRecord | undefined {
  const record = f.after.npcs[owner][layer].find(
    (r) => r.key === key && r.source === source && r.event === f.event.sequence,
  );
  return record
    ? {
        kind: layer === 'known' ? 'npc-known' : 'npc-belief',
        owner,
        key,
        source,
        sourceEvent: record.event,
      }
    : undefined;
}
const rules: Rule[] = [
  trustRule(
    'maya.voss-disclosure.trust',
    'CHOOSE_DIALOGUE',
    'disclosure.voss',
    'maya.case',
    1,
    (f) => npcRef(f, 'maya', 'known', 'voss_connection', 'Adrian discloses the personnel match'),
  ),
  trustRule(
    'maya.checkin-kept.trust',
    'CLINIC_CHOOSE',
    'morning.answer',
    'clinic.contact',
    1,
    (f) => {
      if (f.before.day.closure !== 'checkin') return;
      const record = f.after.day.records.find(
        (r) => r.key === 'morning.answer.message' && r.event === f.event.sequence,
      );
      return record
        ? { kind: 'day-record', key: record.key, source: record.source, sourceEvent: record.event }
        : undefined;
    },
  ),
  trustRule(
    'maya.checkin-missed.trust',
    'CLINIC_CHOOSE',
    'morning.miss',
    'clinic.contact',
    -1,
    (f) =>
      f.before.day.closure === 'checkin'
        ? npcRef(
            f,
            'maya',
            'known',
            'Adrian did not answer the arranged 06:30 call',
            'Maya’s attempted check-in',
          )
        : undefined,
  ),
  {
    id: 'maya.withheld.concern',
    semantics: 'sourced-signal',
    evaluate(f) {
      if (!actionIs(f, 'CHOOSE_DIALOGUE', 'disclosure.nothing') || nodeOf(f.before) !== 'maya.case')
        return [];
      const record = npcRef(
        f,
        'maya',
        'beliefs',
        'Adrian may be withholding concern',
        'Adrian dismisses the case after Maya asks about the unusual review',
      );
      if (!record) throw Error('Missing authored concern observation');
      return [
        {
          ...meta(f, 'maya.withheld.concern', 'signal', 'player-character', 'maya', [
            actionRef(f),
            record,
          ]),
          kind: 'relationship-signal',
          sourceCharacter: 'maya',
          targetCharacter: 'player-character',
          dimension: 'suspicion',
          signal: 'withholding-concern',
        },
      ];
    },
  },
];

for (const basis of ['warning', 'voss_lookup'] as const) {
  const ruleId = `sloane.${basis}.leverage`;
  rules.push({
    id: ruleId,
    semantics: 'sourced-power',
    evaluate(f) {
      if (nodeOf(f.before) !== 'sloane.intro' || nodeOf(f.after) !== 'sloane.allegation') return [];
      const exposure = f.after.day.exposure.find((r) => r.key === basis);
      if (!exposure) return [];
      const known = npcRef(f, 'sloane', 'known', basis, exposure.source);
      const key = basis === 'warning' ? 'maya_warning' : 'maya_lookup';
      const record = f.after.day.records.find((r) => r.key === key && r.layer === 'fact');
      if (!known || !record) throw Error('Leverage lacks authored information path');
      const refs: SupportingRecord[] = [
        actionRef(f),
        known,
        {
          kind: 'exposure',
          key: exposure.key,
          source: exposure.source,
          sourceEvent: exposure.event,
        },
        { kind: 'day-record', key: record.key, source: record.source, sourceEvent: record.event },
      ];
      const leverageId = `${f.event.sequence}:${ruleId}`;
      const base = (slot: string) => meta(f, ruleId, slot, 'sloane', 'player-character', refs);
      // Same authored exchange establishes possession, disclosure and threat. No earlier
      // ownership is invented; knowledge and use are never defaults of record creation.
      return [
        {
          ...base('available'),
          kind: 'leverage-created',
          leverageId,
          holder: 'sloane',
          subject: 'player-character',
          relatedCharacter: 'maya',
          basis,
          validity: 'observed-record-not-proof-of-wrongdoing',
          status: 'available',
        },
        { ...base('holder-knows'), kind: 'leverage-knowledge', leverageId, recipient: 'sloane' },
        { ...base('disclosed'), kind: 'leverage-status', leverageId, status: 'disclosed' },
        {
          ...base('target-knows'),
          kind: 'leverage-knowledge',
          leverageId,
          recipient: 'player-character',
        },
        { ...base('threatened'), kind: 'leverage-status', leverageId, status: 'threatened' },
      ];
    },
  });
}
rules.push({
  id: 'sloane.retained-file.callback',
  semantics: 'callback',
  evaluate(f) {
    if (nodeOf(f.before) !== 'sloane.identity' || nodeOf(f.after) !== 'sloane.offer') return [];
    // Existing callback says the incident material remains in her file. It does not
    // prove enforcement, changed psychology, or that Maya knows of the threat.
    const intro = f.after.ledger.find(
      (e) =>
        e.action.type === 'DAY_CHOOSE' &&
        ['intro.arrest', 'intro.planted', 'intro.counsel', 'intro.silent'].includes(e.action.id),
    );
    if (!intro) return [];
    return (['warning', 'voss_lookup'] as const).flatMap((basis) => {
      const exposure = f.after.day.exposure.find(
        (r) => r.key === basis && r.event <= intro.sequence,
      );
      if (!exposure) return [];
      const leverageId = `${intro.sequence}:sloane.${basis}.leverage`;
      return [
        {
          ...meta(f, 'sloane.retained-file.callback', basis, 'sloane', 'player-character', [
            actionRef(f),
            {
              kind: 'consequence',
              key: `${leverageId}:threatened`,
              sourceEvent: intro.sequence,
              source: 'Earlier displayed incident material and threat',
            },
          ]),
          kind: 'callback' as const,
          leverageId,
        },
      ];
    });
  },
});
export const consequenceRules: readonly Rule[] = Object.freeze(
  rules.map((rule) => Object.freeze(rule)),
);
