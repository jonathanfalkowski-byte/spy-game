import { applyChapter4Choice as applyFrozenChapter4 } from '../persistence/legacy-v15/content/chapter4';
import { applyNextChoice as applyFrozenNext } from '../persistence/legacy-v14/content/chapter3-next';
import { canContinueAudit } from './audit-continuation';
import { applyChapter5Choice as applyFrozenChapter5 } from '../persistence/legacy-v16/content/chapter5';
import { chapter5Choices, applyChapter5Choice } from '../content/chapter5';
import { replay as replayV15, reducer as reducerV15, availableIntents as intentsV15 } from '../persistence/legacy-v15/state/reducer';
import { chapter4Choices, applyChapter4Choice } from '../content/chapter4';
import { replay as replayV14, reducer as reducerV14, availableIntents as intentsV14 } from '../persistence/legacy-v14/state/reducer';
import { replay as replayV13 } from '../persistence/legacy-v13/state/reducer';
import { nextChoices, applyNextChoice } from '../content/chapter3-next';
import { initialState as legacyInitialState, reducer as legacyReducer, replay as legacyReplay, availableIntents as legacyIntents } from '../persistence/legacy-v11/state/reducer';
import { initialState as initialV12, reducer as reducerV12, replay as replayV12, availableIntents as intentsV12 } from '../persistence/legacy-v12/state/reducer';
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
  if (contentRevision === 12) return initialV12();
  if (![13,14,15,16,17,18].includes(contentRevision)) return legacyInitialState();
  const s: GameState = {
    contentRevision: contentRevision === 18 ? 18 : 13,
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

/** New browser runs use revision 18 while the historical/test fixture meaning
 * of initialState() remains revision 13. */
export function newGameState(): GameState {
  return initialState(18);
}
export const availableChoices = (s: GameState) =>
  dialogue.filter(
    (c) =>
      c.node === nodeOf(s) &&
      !s.choices[c.slot] &&
      (!c.requires || s.knowledge.includes(c.requires)),
  );
export const availableChapter3Choices = (s: GameState) =>
  [...chapter3Choices.filter((c) => c.node === nodeOf(s) && !s.day.completed.includes(c.id)), ...((s.contentRevision === 13 || s.contentRevision === 18) ? eveningChoices(s) : []), ...nextChoices(s)];
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
  const auditAction = ActionSchema.safeParse(input);
  if (auditAction.success && auditAction.data.type === 'CONTINUE_AUDIT_REVISION') {
    if (!canContinueAudit(state) || auditAction.data.expectedRevision !== state.revision) return state;
    try { if (stable(replay(state.ledger, state.contentRevision)) !== stable(state)) return state; }
    catch { return state; }
    const next = structuredClone(state);
    next.contentRevision = 17;
    next.revision++;
    next.ledger.push({sequence: next.revision, action: auditAction.data});
    return next;
  }
  if (state.contentRevision === 17) {
    if (!auditAction.success || auditAction.data.expectedRevision !== state.revision) return state;
    const a = auditAction.data;
    if (a.type === 'CHAPTER3_CHOOSE' && state.scene === 'chapter3') return applyNextChoice(state,a.id);
    if (a.type === 'CHAPTER4_CHOOSE') return applyChapter4Choice(state,a.id);
    if (a.type === 'CHAPTER5_CHOOSE') return applyChapter5Choice(state,a.id);
    return state;
  }
  if(state.contentRevision!==15 && state.contentRevision!==16 && state.contentRevision!==18 && input && typeof input==='object' && 'type' in input && input.type==='CHAPTER5_CHOOSE')return state;
  if (state.contentRevision === 16 || state.contentRevision === 15) {
    const parsed=ActionSchema.safeParse(input);
    if(parsed.success && parsed.data.type==='CHAPTER5_CHOOSE' && parsed.data.expectedRevision===state.revision){
      if(state.contentRevision===15){
        try { if(stable(replayV15(state.ledger as Parameters<typeof replayV15>[0],15))!==stable(state)) return state; } catch { return state; }
      }
      return applyFrozenChapter5(state,parsed.data.id);
    }
    return state.contentRevision===15 ? reducerV15(state as Parameters<typeof reducerV15>[0],input) : state;
  }
  if (state.contentRevision === 14) {
    const parsed = ActionSchema.safeParse(input);
    if (parsed.success && parsed.data.type === 'CHAPTER4_CHOOSE' && parsed.data.expectedRevision === state.revision) {
      if (state.contentRevision === 14) {
        try { if (stable(replayV14(state.ledger as Parameters<typeof replayV14>[0],14)) !== stable(state)) return state; }
        catch { return state; }
      }
      return applyFrozenChapter4(state as Parameters<typeof applyFrozenChapter4>[0], parsed.data.id);
    }
    return state.contentRevision === 14 ? reducerV14(state as Parameters<typeof reducerV14>[0],input) : state;
  }
  if ((state.contentRevision === 13 && state.scene === 'chapter3' && state.phase === 'nightComplete')) {
    const parsed = ActionSchema.safeParse(input);
    if (!parsed.success || parsed.data.expectedRevision !== state.revision || parsed.data.type !== 'CHAPTER3_CHOOSE') return state;
    if (state.contentRevision === 13) {
      try { if (stable(replayV13(state.ledger as Parameters<typeof replayV13>[0])) !== stable(state)) return state; }
      catch { return state; }
    }
    return applyFrozenNext(state as Parameters<typeof applyFrozenNext>[0], parsed.data.id);
  }
  if (state.contentRevision === 12) {
    const parsed = ActionSchema.safeParse(input);
    if (parsed.success && parsed.data.type === 'CONTINUE_CHAPTER3_SCENE2') {
      if (parsed.data.expectedRevision !== state.revision || nodeOf(state) !== 'chapter3.complete') return state;
      try {
        const verified = replayV12(state.ledger as Parameters<typeof replayV12>[0]);
        if (stable(verified) !== stable(state)) return state;
        const next = replay(state.ledger, 13);
        if (stable({...next, contentRevision:12}) !== stable(state)) return state;
        return reducer(next, input);
      } catch { return state; }
    }
    return reducerV12(state as Parameters<typeof reducerV12>[0], input);
  }
  if (state.contentRevision !== 13 && state.contentRevision !== 18)
    return legacyReducer(state as Parameters<typeof legacyReducer>[0], input);
  const parsed = ActionSchema.safeParse(input);
  if (!parsed.success || parsed.data.expectedRevision !== state.revision) return state;
  const action = parsed.data;
  const node = nodeOf(state);
  const s = structuredClone(state);
  s.revision++;
  s.feedback = '';
  switch (action.type) {
    case 'CHAPTER4_CHOOSE':
      if (state.contentRevision !== 18) return state;
      return applyChapter4Choice(state, action.id);
    case 'CHAPTER5_CHOOSE':
      if (state.contentRevision !== 18) return state;
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
      if (state.contentRevision === 18 && nextChoices(state).some((choice) => choice.id === action.id))
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
  if (contentRevision === 17) {
    const boundary = events.findIndex(e => e.action.type === 'CONTINUE_AUDIT_REVISION');
    if (boundary < 0) throw Error('Missing explicit revision-17 continuation.');
    const prefix = events.slice(0,boundary);
    let state = replayPrefix(prefix,16);
    for (const event of events.slice(boundary)) {
      if (event.sequence !== state.revision + 1) throw Error('Noncontiguous revision-17 event.');
      const next = reducer(state,event.action);
      if (next === state) throw Error('Invalid revision-17 event.');
      state = next;
    }
    if (state.contentRevision !== 17) throw Error('Missing revision-17 state.');
    return state;
  }
  if (contentRevision === 18) {
    let state = initialState(18);
    for (const event of events) {
      if (event.sequence !== state.revision + 1) throw new Error('Event sequence is not contiguous.');
      const next = reducer(state, event.action);
      if (next === state) throw new Error(`Invalid revision-18 event at sequence ${event.sequence}.`);
      state = next;
    }
    if (state.contentRevision !== 18) throw new Error('Missing revision-18 state.');
    return state;
  }
  if (contentRevision === 12) return replayV12(events as Parameters<typeof replayV12>[0]);
  if (contentRevision === 13) return replayV13(events as Parameters<typeof replayV13>[0]);
  if (contentRevision === 14) return replayV14(events as Parameters<typeof replayV14>[0],14);
  if (contentRevision === 15) return replayV15(events as Parameters<typeof replayV15>[0],15);
  if (contentRevision !== 16) return legacyReplay(events as Parameters<typeof legacyReplay>[0]);
  let state = initialState();
  for (const event of events) {
    if (event.sequence !== state.revision + 1) throw new Error('Event sequence is not contiguous.');
    const next = reducer(state, event.action);
    if (next === state) throw new Error(`Invalid event at sequence ${event.sequence}.`);
    state = next;
  }
  if (state.contentRevision !== 16) throw new Error('Missing revision-16 continuation.');
  return state;
}
export function availableIntents(s: GameState): Intent[] {
  return [...(canContinueAudit(s) ? [{type:'CONTINUE_AUDIT_REVISION' as const}] : []), ...storyIntents(s)];
}
function storyIntents(s: GameState): Intent[] {
  if (s.contentRevision === 17) return [
    ...nextChoices(s).map(c=>({type:'CHAPTER3_CHOOSE' as const,id:c.id})),
    ...chapter4Choices(s).map(c=>({type:'CHAPTER4_CHOOSE' as const,id:c.id})),
    ...chapter5Choices(s).map(c=>({type:'CHAPTER5_CHOOSE' as const,id:c.id})),
  ];
  if(s.contentRevision===16)return chapter5Choices(s).map(c=>({type:'CHAPTER5_CHOOSE' as const,id:c.id}));
  if(s.contentRevision===15)return [...intentsV15(s as Parameters<typeof intentsV15>[0]),...chapter5Choices(s).map(c=>({type:'CHAPTER5_CHOOSE' as const,id:c.id}))];
  if (s.contentRevision === 14) return [...intentsV14(s as Parameters<typeof intentsV14>[0]), ...chapter4Choices(s).map(c=>({type:'CHAPTER4_CHOOSE' as const,id:c.id}))];
  if (s.contentRevision === 12) return [...intentsV12(s as Parameters<typeof intentsV12>[0]), ...(nodeOf(s) === 'chapter3.complete' ? [{type:'CONTINUE_CHAPTER3_SCENE2' as const}] : [])];
  if (s.contentRevision !== 13 && s.contentRevision !== 18)
    return legacyIntents(s as Parameters<typeof legacyIntents>[0]);
  const intents: Intent[] = availableChoices(s).map((c) => ({ type: 'CHOOSE_DIALOGUE', id: c.id }));
  intents.push(...availableDayChoices(s).map((c) => ({ type: 'DAY_CHOOSE' as const, id: c.id })));
  intents.push(
    ...availableMissionChoices(s).map((c) => ({ type: 'MISSION_CHOOSE' as const, id: c.id })),
    ...availableClinicChoices(s).map((c) => ({ type: 'CLINIC_CHOOSE' as const, id: c.id })),
  );
  intents.push(...availableChapter3Choices(s).map((c) => ({ type: 'CHAPTER3_CHOOSE' as const, id: c.id })));
  if (s.contentRevision === 18) {
    intents.push(...chapter4Choices(s).map((c) => ({ type: 'CHAPTER4_CHOOSE' as const, id: c.id })));
    intents.push(...chapter5Choices(s).map((c) => ({ type: 'CHAPTER5_CHOOSE' as const, id: c.id })));
  }
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

// Stable object-key ordering for exact frozen-snapshot authentication.
function stable(value: unknown): string {
  if (Array.isArray(value)) return '['+value.map(stable).join(',')+']';
  if (value && typeof value === 'object') return '{'+Object.entries(value).sort(([a],[b])=>a.localeCompare(b)).map(([k,v])=>JSON.stringify(k)+':'+stable(v)).join(',')+'}';
  return JSON.stringify(value);
}

/** Prefix inspection selects the last authenticated epoch; full-save replay stays strict. */
export function replayPrefix(events: GameEvent[], contentRevision = 13): GameState {
 if (contentRevision === 18) return replay(events,18);
 if (events.some(e => e.action.type === 'CONTINUE_AUDIT_REVISION')) return replay(events,17);
 const epoch = contentRevision >= 13 ? events.some(e=>e.action.type==='CHAPTER5_CHOOSE') ? 16 : events.some(e=>e.action.type==='CHAPTER4_CHOOSE') ? 15 : events.some(e=>e.action.type==='CHAPTER3_CHOOSE' && e.action.id==='chapter3.begin-followup') ? 14 : 13 : contentRevision;
 return replay(events,epoch);
}
