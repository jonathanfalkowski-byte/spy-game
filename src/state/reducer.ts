import { initialState as initialV18, reducer as reducerV18, replay as replayV18, replayPrefix as replayPrefixV18, availableIntents as intentsV18 } from '../persistence/legacy-v18/state/reducer';
import { chapter5Choices, applyChapter5Choice } from '../content/chapter5';
import { chapter4Choices, applyChapter4Choice } from '../content/chapter4';
import { nextChoices, applyNextChoice } from '../content/chapter3-next';
import { eveningChoices, eveningScenes } from '../content/chapter3-evening';
import { applyEveningChoice } from './chapter3-evening-engine';
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
import { chapter3Choices } from '../content/chapter3';

export const nodeOf = (state: GameState) => `${state.scene}.${state.phase}` as NodeId;
export function initialState(contentRevision = 13): GameState {
  if (contentRevision !== 19) return initialV18(contentRevision) as GameState;
  const s: GameState = {
    contentRevision: 19,
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
  Object.assign(s.npcs, { sebastian: { known: [], beliefs: [] } });
  s.history.push({ node: nodeOf(s), blocks: sceneBlocks(s) });
  return s;
}

/** New browser runs use revision 19 while the historical/test fixture meaning
 * of initialState() remains revision 13. */
export function newGameState(): GameState {
  return initialState(19);
}
export const availableChoices = (s: GameState) =>
  dialogue.filter(
    (c) =>
      c.node === nodeOf(s) &&
      !s.choices[c.slot] &&
      (!c.requires || s.knowledge.includes(c.requires)),
  );
export const availableChapter3Choices = (s: GameState) =>
  [...chapter3Choices.filter((c) => c.node === nodeOf(s) && !s.day.completed.includes(c.id)), ...(s.contentRevision === 19 ? eveningChoices(s) : []), ...nextChoices(s)];
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
    // Client names only: Maya saw Helix and Novagen on a Strategic Intelligence report header.
    // Not the assignment's content, any finding, or any link to Evelynn.
    observe(s, 'maya', 'helix_assignment', 'Helix and Novagen client names on a Strategic Intelligence report header at Adrian’s desk');
    observe(s, 'maya', 'compliance_cleared', 'Maya’s own compliance work');
  }
  s.history.push({ node: id, blocks: sceneBlocks(s) });
}
function history(s: GameState, blocks: Block[]) {
  s.history.push({ node: nodeOf(s), blocks });
}
function recordChapter3(s: GameState, key: string, text: string, source: string, layer: 'fact' | 'claim' = 'fact') {
  if (!s.day.records.some((r) => r.key === key)) {
    s.day.records.push({ key, layer, text, source, event: s.revision });
    add(layer === 'fact' ? s.facts : s.claims, key);
    add(s.knowledge, key);
  }
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
  // Revisions 13-18 (and the older epochs they delegate to) run on the frozen revision-18 engine.
  // Known limitation: the UI reads pre-choice labels/hints from live content, so older saves may show
  // revision-19 hint wording before choosing; saved history always comes from the frozen engine.
  if (state.contentRevision !== 19) return reducerV18(state as Parameters<typeof reducerV18>[0], input) as GameState;
  const parsed = ActionSchema.safeParse(input);
  if (!parsed.success || parsed.data.expectedRevision !== state.revision) return state;
  const action = parsed.data;
  const node = nodeOf(state);
  const s = structuredClone(state);
  s.revision++;
  s.feedback = '';
  switch (action.type) {
    case 'CONTINUE_AUDIT_REVISION':
      return state;
    case 'CHAPTER4_CHOOSE':
      return applyChapter4Choice(state, action.id);
    case 'CHAPTER5_CHOOSE':
      return applyChapter5Choice(state, action.id);
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
      enter(s, c.next as NodeId);
      break;
    }
    case 'CONTINUE':
      if (!canContinue(state)) return state;
      enter(s, sceneById[node].next!);
      break;
    case 'CONTINUE_CHAPTER3':
      if (node !== 'mission.complete' || s.day.outcome !== 'accepted' || s.mission.outcome !== 'complete' || s.clinic.outcome !== 'departed') return state;
      enter(s, 'chapter3.home');
      s.feedback = 'Chapter 3 continuation recorded. The historical day remains unchanged.';
      break;
    case 'CONTINUE_CHAPTER3_SCENE2':
      if (node !== 'chapter3.complete') return state;
      enter(s, 'chapter3.mayaContact');
      break;
    case 'CHAPTER3_CHOOSE': {
      if (nextChoices(state).some((choice) => choice.id === action.id))
        return applyNextChoice(state, action.id);
      if (eveningScenes.some(scene => scene.id === node)) {
        if (!applyEveningChoice(state, s, action.id)) return state;
        break;
      }
      const c = availableChapter3Choices(state).find((choice) => choice.id === action.id);
      if (!c || node === 'chapter3.complete') return state;
      add(s.day.completed, c.id);
      if (action.id === 'chapter3.mirror') {
        recordChapter3(s, 'chapter3_mirror', 'Evelynn examined the presentation carried home from the Glass House without selecting an identity interpretation.', 'Evelynn’s private apartment observation');
        history(s, [{ kind: 'thought', text: (s.mission.completed.includes('home.mirror') ? 'Earlier I watched this face move in the same mirror. Now I try the still expression I used when Marcus said Singapore. ' : 'I try the still expression I used when Marcus said Singapore. ') + 'The glass gives me the expression, not the evening he remembers.' }]);
      } else if (action.id === 'chapter3.clothing') {
        recordChapter3(s, 'chapter3_clothing', 'Evelynn handled the selected presentation clothing and separated mission requirements from personal customization.', 'Evelynn’s apartment observation');
        history(s, [{ kind: 'thought', text: (s.clinic.outfit === 'executive' ? 'The jacket cuff has folded under. I smooth it with my thumb.' : s.clinic.outfit === 'socialite' ? 'The hem brushes the chair leg as I sit. I lift it clear and let the fabric settle.' : 'A narrow fold in the quiet fabric has held the shape of the car seat. I press it flat.') + (s.mission.completed.includes('home.detail.watch') ? ' The old watch catches against the fabric.' : s.mission.completed.includes('home.detail.earrings') ? ' I loosen one of the earrings I added before leaving.' : '') }]);
      } else if (action.id === 'chapter3.evidence') {
        const available = s.mission.capture?.owner === 'Evelyn' || s.mission.token === 'evelyn';
        recordChapter3(s, 'chapter3_evidence', available ? 'Evelynn checked retained Glass House material without changing its custody.' : 'Evelynn found no independently retained Glass House material to inspect.', 'Apartment evidence check');
        history(s, [{ kind: 'notice', text: s.mission.token === 'evelyn' ? 'Benton’s access token is still in your custody. It is separate from the information wafer he pocketed; possession does not authenticate that wafer.' : s.mission.capture?.owner === 'Evelyn' ? 'The photograph is on the monitored phone. ' + s.mission.capture.limits : s.mission.capture?.owner === 'Sloane' ? 'Sloane controls the audio recording. You have no independent copy on the phone.' : 'You brought back no capture to inspect. Benton retained his token.' }]);
      } else if (action.id === 'chapter3.phone') {
        recordChapter3(s, 'chapter3_phone', 'Evelynn set down the monitored phone before receiving Sloane’s residential-entry message.', 'Evelynn’s apartment action');
        history(s, [{ kind: 'thought', text: 'The phone is on the table. The monitoring does not stop because I stop looking at it.' }]);
        enter(s, 'chapter3.surveillance');
      } else {
        const text = action.id === 'chapter3.confirm' ? 'Evelynn confirmed arrival without authorizing broader residential monitoring.' : action.id === 'chapter3.scope' ? 'Evelynn asked who receives the residential-entry record and what reporting scope applies.' : action.id === 'chapter3.challenge' ? 'Evelynn challenged the monitoring justification while acknowledging the recorded entry event.' : 'Evelynn left Sloane’s residential-entry request unanswered.';
        recordChapter3(s, 'chapter3_sloane_' + action.id.split('.')[1], text, 'Sloane’s residential-entry message and Evelynn’s response');
        const reply = (speaker: string, text: string): Block => ({kind:'speech', speaker, text});
        if (action.id === 'chapter3.confirm') {
          history(s, [reply('You · message', 'I am home.'), reply('Sloane · message', 'Received. That closes the check-in.')]);
          observe(s, 'sloane', 'Evelynn confirmed arrival at home', 'Her delivered residential check-in');
        } else if (action.id === 'chapter3.scope') {
          history(s, [reply('You · message', 'Who receives the entry record? I want to know where it goes.'),
            reply('Sloane · message', 'Executive Intelligence’s active-compromise review. I will not give you the individual recipients. The entry record is what reached me; it is not an account of what you do in the apartment.')]);
          observe(s, 'sloane', 'Evelynn asked who receives the residential-entry record', 'Her delivered scope question');
          recordChapter3(s, 'chapter3_monitoring_scope', 'Sloane says Executive Intelligence’s active-compromise review receives the entry record and declines to identify individual recipients.', 'Sloane’s written answer; scope not independently verified', 'claim');
        } else if (action.id === 'chapter3.challenge') {
          history(s, [reply('You · message', 'A residential badge is not permission to watch my home. Why are you using it this way?'),
            reply('Sloane · message', 'I am using the forwarded entry record for the active-compromise review. I will not debate the justification on this channel. You asked about the record; I am still asking you to confirm arrival.')]);
          observe(s, 'sloane', 'Evelynn challenged the use of the residential-entry record', 'Her delivered monitoring challenge');
          recordChapter3(s, 'chapter3_monitoring_scope', 'Sloane invokes the active-compromise review and refuses to debate its justification on the monitored channel.', 'Sloane’s written justification and refusal; not independent authority', 'claim');
        } else {
          history(s, [{kind:'narrative', text:'You leave the reply field empty. The screen dims without a sent message.'}]);
        }
        s.feedback = text;
        enter(s, c.next as NodeId);
      }
      break;
    }
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
export function replay(events: GameEvent[], contentRevision = 13): GameState {
  if (contentRevision !== 19) return replayV18(events as Parameters<typeof replayV18>[0], contentRevision) as GameState;
  let state = initialState(19);
  for (const event of events) {
    if (event.sequence !== state.revision + 1) throw new Error('Event sequence is not contiguous.');
    const next = reducer(state, event.action);
    if (next === state) throw new Error(`Invalid revision-19 event at sequence ${event.sequence}.`);
    state = next;
  }
  if (state.contentRevision !== 19) throw new Error('Missing revision-19 state.');
  return state;
}
export function availableIntents(s: GameState): Intent[] {
  if (s.contentRevision !== 19) return intentsV18(s as Parameters<typeof intentsV18>[0]) as Intent[];
  return storyIntents(s);
}
function storyIntents(s: GameState): Intent[] {
  const intents: Intent[] = availableChoices(s).map((c) => ({ type: 'CHOOSE_DIALOGUE', id: c.id }));
  intents.push(...availableDayChoices(s).map((c) => ({ type: 'DAY_CHOOSE' as const, id: c.id })));
  intents.push(
    ...availableMissionChoices(s).map((c) => ({ type: 'MISSION_CHOOSE' as const, id: c.id })),
    ...availableClinicChoices(s).map((c) => ({ type: 'CLINIC_CHOOSE' as const, id: c.id })),
  );
  intents.push(...availableChapter3Choices(s).map((c) => ({ type: 'CHAPTER3_CHOOSE' as const, id: c.id })));
  intents.push(...chapter4Choices(s).map((c) => ({ type: 'CHAPTER4_CHOOSE' as const, id: c.id })));
  intents.push(...chapter5Choices(s).map((c) => ({ type: 'CHAPTER5_CHOOSE' as const, id: c.id })));
  if (s.scene === 'mission' && s.phase === 'complete' && s.day.outcome === 'accepted' && s.mission.outcome === 'complete' && s.clinic.outcome === 'departed') intents.push({ type: 'CONTINUE_CHAPTER3' });
  if (nodeOf(s) === 'chapter3.complete') intents.push({type:'CONTINUE_CHAPTER3_SCENE2'});
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

/** Prefix inspection selects the last authenticated epoch; full-save replay stays strict. */
export function replayPrefix(events: GameEvent[], contentRevision = 13): GameState {
 if (contentRevision !== 19) return replayPrefixV18(events as Parameters<typeof replayPrefixV18>[0], contentRevision) as GameState;
 return replay(events,19);
}
