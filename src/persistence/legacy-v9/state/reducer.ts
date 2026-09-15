import { initialMission } from './mission-schema';
import { applyMissionChoice } from './mission-engine';
import { availableMissionChoices } from '../content/mission';
import { ActionSchema, type Action, type GameEvent, type Intent } from './actions';
import { type GameState, type InferenceSchema } from './schema';
import { type NodeId, type AssessmentId, type Block } from '../content/schema';
import { dialogue, choiceById } from '../content/dialogue';
import { inspections, sceneById, sceneBlocks } from '../content/scenes';
import { documents, searches, assessments, evaluateRelation } from '../content/evidence';
import { initialDay } from './day-schema';
import { applyDayChoice } from './day-engine';
import { availableDayChoices } from '../content/day';
import { initialClinic } from './clinic-schema';
import { applyClinicChoice } from './clinic-engine';
import { availableClinicChoices } from '../content/clinic';

export const nodeOf = (state: GameState) => `${state.scene}.${state.phase}` as NodeId;
export function initialState(): GameState {
  const s: GameState = {
    day: initialDay(),
    clinic: initialClinic(),
    mission: initialMission(),
    scene: 'apartment',
    phase: 'bond',
    revision: 0,
    choices: {},
    inspected: [],
    documents: [],
    facts: [],
    claims: [],
    inferences: [],
    proof: [],
    knowledge: ['adrian_career', 'maya_history'],
    npcs: {
      daniel: { known: [], beliefs: [] },
      benton: { known: [], beliefs: [] },
      maya: { known: [], beliefs: [] },
      sloane: { known: [], beliefs: [] },
      marcus: { known: [], beliefs: [] },
      voss: { known: [], beliefs: [] },
      celeste: { known: [], beliefs: [] },
    },
    relationships: { mayaTrust: 0, credibility: 0, bond: null },
    opportunities: 1,
    investigation: null,
    selected: [],
    feedback: '',
    hintUsed: false,
    draft: null,
    report: null,
    history: [],
    ledger: [],
  };
  s.history.push({ node: nodeOf(s), blocks: sceneBlocks(s) });
  return s;
}
export const availableChoices = (s: GameState) =>
  dialogue.filter(
    (c) =>
      c.node === nodeOf(s) &&
      !s.choices[c.slot] &&
      (!c.requires || s.knowledge.includes(c.requires)),
  );
const add = (list: string[], value: string) => {
  if (!list.includes(value)) list.push(value);
};
function observe(
  s: GameState,
  npc: keyof GameState['npcs'],
  key: string,
  source: string,
  belief = false,
) {
  const list = belief ? s.npcs[npc].beliefs : s.npcs[npc].known;
  if (!list.some((v) => v.key === key && v.source === source))
    list.push({ key, source, event: s.revision });
}
function enter(s: GameState, id: NodeId) {
  const [scene, phase] = id.split('.');
  s.scene = scene as GameState['scene'];
  s.phase = phase;
  if (id === 'office.daniel') {
    add(s.knowledge, 'promotion_lost');
    observe(s, 'daniel', 'promotion_lost', 'Daniel delivers the promotion news in person');
  }
  if (id === 'office.benton') {
    add(s.knowledge, 'keep_narrow');
    observe(s, 'benton', 'helix_assignment', 'Benton assigns the Helix review');
  }
  if (id === 'helix.brief') add(s.knowledge, 'marcus_sponsor');
  if (id === 'maya.promotion')
    observe(s, 'maya', 'promotion_lost', 'Daniel told Maya about Priya, as Maya states on arrival');
  if (id === 'maya.case') {
    add(s.knowledge, 'compliance_cleared');
    add(s.claims, 'compliance_cleared');
    observe(s, 'maya', 'helix_assignment', 'Visible report header at Adrian’s desk');
    observe(s, 'maya', 'compliance_cleared', 'Maya’s own compliance work');
  }
  s.history.push({ node: id, blocks: sceneBlocks(s) });
}
function history(s: GameState, blocks: Block[]) {
  s.history.push({ node: nodeOf(s), blocks });
}
export function assess(s: GameState, id: AssessmentId) {
  const conflict = s.knowledge.includes('patent_conflict');
  const quality =
    id === 'fraud'
      ? 'incorrect'
      : id === 'bounded'
        ? conflict
          ? 'supported'
          : 'incorrect'
        : id === 'insufficient'
          ? conflict
            ? 'supported'
            : 'unresolved'
          : 'weak';
  const feedback =
    quality === 'supported'
      ? 'Your assessment separates the problem in the stated rationale from a motive the evidence does not establish.'
      : quality === 'unresolved'
        ? 'You are submitting uncertainty without resolving the conflict in the case. Benton will receive unresolved work; this reduces his confidence in your analysis.'
        : quality === 'incorrect'
          ? 'The accessible records do not establish fraud. An accusation presented as fact is unsupported; Benton will receive that accusation and your analytical credibility will suffer.'
          : id === 'personnel'
            ? 'Personnel is a plausible hypothesis, especially with recruiting and valuation evidence. The report states it as the motive without proof. Submitting this overstatement reduces your analytical credibility.'
            : 'Clinical relationships appear in an outside valuation. That does not establish Helix wants the data. Submitting this as the motive reduces your analytical credibility.';
  return { quality, feedback } as const;
}
export function canContinue(s: GameState) {
  const node = nodeOf(s);
  return !!sceneById[node].next && (node !== 'helix.documents' || s.documents.length >= 2);
}
export function reducer(state: GameState, input: unknown): GameState {
  const parsed = ActionSchema.safeParse(input);
  if (!parsed.success || parsed.data.expectedRevision !== state.revision) return state;
  const action = parsed.data;
  const node = nodeOf(state);
  const s = structuredClone(state);
  s.revision++;
  s.feedback = '';
  switch (action.type) {
    case 'MISSION_CHOOSE':
      if (!applyMissionChoice(state, s, action.id)) return state;
      break;
    case 'CLINIC_CHOOSE':
      if (!applyClinicChoice(state, s, action.id)) return state;
      break;
    case 'DAY_CHOOSE':
      if (!applyDayChoice(state, s, action.id)) return state;
      break;
    case 'CHOOSE_DIALOGUE': {
      const c = availableChoices(state).find((c) => c.id === action.id);
      if (!c) return state;
      s.choices[c.slot] = c.id;
      history(s, [
        {
          kind:
            c.slot === 'bond'
              ? 'thought'
              : ['morning.ignore', 'promotion.quiet'].includes(c.id)
                ? 'narrative'
                : 'speech',
          speaker: 'Adrian',
          text: c.label,
        },
      ]);
      if (c.slot === 'bond') s.relationships.bond = c.value as 'friend' | 'love' | 'colleague';
      if (c.slot === 'morning' && c.value !== 'ignore') {
        observe(s, 'maya', c.label, 'Adrian’s morning message');
        if (c.value === 'yes') s.relationships.mayaTrust++;
      }
      if (c.slot === 'promotion') {
        observe(s, 'daniel', c.label, 'Adrian’s reply at his desk');
        if (c.value === 'professional')
          observe(
            s,
            'daniel',
            'Adrian may be concealing disappointment',
            'Adrian’s professional reply after losing the promotion',
            true,
          );
      }
      if (c.slot === 'benton')
        observe(s, 'benton', c.label, 'Adrian’s spoken response to the assignment');
      if (c.slot === 'mayaPromotion') {
        observe(s, 'maya', c.label, 'Adrian’s response over coffee');
        if (['hurt', 'angry'].includes(c.value)) s.relationships.mayaTrust++;
        else
          observe(
            s,
            'maya',
            'Adrian may be deflecting disappointment',
            'Adrian’s answer and the promotion news from Daniel',
            true,
          );
      }
      if (c.slot === 'invitation') {
        observe(s, 'maya', c.label, 'Adrian’s answer to the evening invitation');
        if (c.value === 'yes') s.relationships.mayaTrust++;
      }
      if (c.slot === 'disclosure') {
        observe(s, 'maya', c.label, 'Adrian’s case discussion');
        if (c.value === 'voss') {
          observe(s, 'maya', 'voss_connection', 'Adrian discloses the personnel match');
          s.relationships.mayaTrust++;
        }
        if (c.value === 'contradiction')
          observe(
            s,
            'maya',
            'patent_conflict',
            'Adrian discloses the conflict in the patent rationale',
          );
        if (c.value === 'private')
          observe(s, 'maya', 'keep_narrow', 'Adrian repeats Benton’s instruction');
        if (c.value === 'nothing')
          observe(
            s,
            'maya',
            'Adrian may be withholding concern',
            'Adrian dismisses the case after Maya asks about the unusual review',
            true,
          );
      }
      s.feedback = `Recorded: ${c.label}`;
      enter(s, c.next);
      break;
    }
    case 'CONTINUE':
      if (!canContinue(state)) return state;
      enter(s, sceneById[node].next!);
      break;
    case 'INSPECT_APARTMENT': {
      if (state.scene !== 'apartment' || s.inspected.includes(action.id)) return state;
      const item = inspections.find((i) => i.id === action.id)!;
      add(s.inspected, action.id);
      add(s.facts, 'apartment_' + action.id);
      add(s.knowledge, 'apartment_' + action.id);
      s.feedback = item.text;
      history(s, [{ kind: 'thought', text: item.text }]);
      break;
    }
    case 'READ_DOCUMENT': {
      if (!['helix.documents', 'helix.analysis'].includes(node) || s.documents.includes(action.id))
        return state;
      const doc = documents.find((d) => d.id === action.id)!;
      s.documents.push(doc.id);
      add(doc.layer === 'fact' ? s.facts : s.claims, doc.id);
      add(s.knowledge, 'read_' + doc.id);
      s.feedback = `Read: ${doc.title}. ${doc.limits}`;
      history(s, [{ kind: 'notice', text: `Read ${doc.title} — ${doc.summary} ${doc.limits}` }]);
      break;
    }
    case 'TOGGLE_EVIDENCE': {
      if (node !== 'helix.analysis' || !s.documents.includes(action.id)) return state;
      if (s.selected.includes(action.id)) s.selected = s.selected.filter((id) => id !== action.id);
      else {
        if (s.selected.length === 2) return state;
        s.selected.push(action.id);
      }
      s.feedback = `${s.selected.length} of 2 records selected.`;
      break;
    }
    case 'CONNECT_EVIDENCE': {
      if (node !== 'helix.analysis' || s.selected.length !== 2) return state;
      const evaluation = evaluateRelation(s.selected, action.relation);
      if (s.inferences.some((i) => i.pair === evaluation.pair && i.relation === action.relation))
        return state;
      const { knowledge, ...inference } = evaluation;
      s.inferences.push({ ...inference, event: s.revision });
      if (knowledge) add(s.knowledge, knowledge);
      s.feedback = evaluation.text;
      history(s, [{ kind: 'notice', text: evaluation.text }]);
      break;
    }
    case 'REQUEST_HINT':
      if (node !== 'helix.analysis' || s.hintUsed) return state;
      s.hintUsed = true;
      s.feedback =
        'Compare the stated reason for buying Novagen with the authenticated record of what Helix did with the same asset type. Does one make the other harder to accept? Hints and retries cost no opportunity.';
      history(s, [{ kind: 'notice', text: s.feedback }]);
      break;
    case 'SPEND_INVESTIGATION': {
      if (node !== 'helix.analysis' || s.opportunities !== 1 || s.investigation) return state;
      const search = searches.find((v) => v.id === action.id)!;
      s.investigation = search.id;
      s.opportunities = 0;
      add(s.knowledge, search.knowledge);
      add(s.facts, search.knowledge);
      s.feedback = `${search.action} ${search.result} This follow-up uses your one investigation opportunity before the deadline. 0 opportunities remain.`;
      history(s, [
        { kind: 'notice', text: s.feedback },
        { kind: 'thought', text: search.thought },
      ]);
      break;
    }
    case 'REVIEW_ASSESSMENT':
      if (
        node !== 'helix.analysis' ||
        (action.id === 'bounded' && !s.knowledge.includes('patent_conflict'))
      )
        return state;
      s.draft = action.id;
      enter(s, 'helix.review');
      break;
    case 'REVISE_ASSESSMENT':
      if (node !== 'helix.review') return state;
      enter(s, 'helix.analysis');
      break;
    case 'SUBMIT_ASSESSMENT': {
      if (node !== 'helix.review' || !s.draft || s.report) return state;
      const result = assess(s, s.draft);
      s.report = {
        assessment: s.draft,
        ...result,
        text: assessments.find((a) => a.id === s.draft)!.text,
        documents: [...s.documents],
        connections: structuredClone(s.inferences),
        search: s.investigation,
        recipient: 'benton',
        event: s.revision,
      };
      if (result.quality !== 'supported') s.relationships.credibility--;
      observe(s, 'benton', `Report: ${s.report.text}`, 'Adrian submits the Helix report');
      for (const id of s.documents)
        observe(s, 'benton', 'read_' + id, 'Record attached to Adrian’s submitted report');
      if (s.knowledge.includes('patent_conflict'))
        observe(s, 'benton', 'patent_conflict', 'Connection attached to Adrian’s submitted report');
      if (s.investigation)
        observe(
          s,
          'benton',
          searches.find((a) => a.id === s.investigation)!.knowledge,
          'Follow-up attached to Adrian’s submitted report',
        );
      observe(
        s,
        'benton',
        result.quality === 'supported'
          ? 'Adrian submitted a bounded analysis'
          : 'Adrian’s analytical credibility is reduced',
        'Assessment content received from Adrian',
        true,
      );
      s.opportunities = 0;
      s.feedback = 'Report submitted to Benton. Your judgment is recorded.';
      enter(s, 'helix.submitted');
      history(s, [{ kind: 'notice', text: s.report.text + ' ' + s.report.feedback }]);
      break;
    }
  }
  s.ledger.push({ sequence: s.revision, action });
  return s;
}
export function act(state: GameState, intent: Intent) {
  return reducer(state, { ...intent, expectedRevision: state.revision });
}
export function replay(events: readonly { sequence: number; action: unknown }[]): GameState {
  let state = initialState();
  for (const event of events) {
    if (event.sequence !== state.revision + 1) throw new Error('Event sequence is not contiguous.');
    const action = ActionSchema.parse(event.action);
    const next = reducer(state, action);
    if (next === state) throw new Error(`Invalid event at sequence ${event.sequence}.`);
    state = next;
  }
  return state;
}
export function availableIntents(s: GameState): Intent[] {
  const intents: Intent[] = availableChoices(s).map((c) => ({ type: 'CHOOSE_DIALOGUE', id: c.id }));
  intents.push(...availableDayChoices(s).map((c) => ({ type: 'DAY_CHOOSE' as const, id: c.id })));
  intents.push(
    ...availableMissionChoices(s).map((c) => ({ type: 'MISSION_CHOOSE' as const, id: c.id })),
    ...availableClinicChoices(s).map((c) => ({ type: 'CLINIC_CHOOSE' as const, id: c.id })),
  );
  if (canContinue(s)) intents.push({ type: 'CONTINUE' });
  if (s.scene === 'apartment')
    inspections
      .filter((i) => !s.inspected.includes(i.id))
      .forEach((i) => intents.push({ type: 'INSPECT_APARTMENT', id: i.id }));
  const node = nodeOf(s);
  if (['helix.documents', 'helix.analysis'].includes(node))
    documents
      .filter((d) => !s.documents.includes(d.id))
      .forEach((d) => intents.push({ type: 'READ_DOCUMENT', id: d.id }));
  if (node === 'helix.analysis') {
    s.documents
      .filter((id) => s.selected.includes(id) || s.selected.length < 2)
      .forEach((id) => intents.push({ type: 'TOGGLE_EVIDENCE', id }));
    if (s.selected.length === 2)
      for (const relation of ['conflict', 'support', 'unrelated', 'uncertain'] as const)
        if (
          !s.inferences.some(
            (i) => i.pair === [...s.selected].sort().join('|') && i.relation === relation,
          )
        )
          intents.push({ type: 'CONNECT_EVIDENCE', relation });
    if (!s.hintUsed) intents.push({ type: 'REQUEST_HINT' });
    if (s.opportunities)
      searches.forEach((v) => intents.push({ type: 'SPEND_INVESTIGATION', id: v.id }));
    assessments
      .filter((a) => a.id !== 'bounded' || s.knowledge.includes('patent_conflict'))
      .forEach((a) => intents.push({ type: 'REVIEW_ASSESSMENT', id: a.id }));
  }
  if (node === 'helix.review')
    intents.push({ type: 'REVISE_ASSESSMENT' }, { type: 'SUBMIT_ASSESSMENT' });
  return intents;
}
