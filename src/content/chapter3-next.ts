import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, type Block, type NodeId } from './schema';

export type NextChoice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
export const flag = (s: GameState, key: string) => s.choices['c3.' + key];
export const mark = (s: GameState, key: string, value = 'yes') => { s.choices['c3.' + key] = value; };
export function record(s: GameState, key: string, text: string, source: string, layer: 'fact'|'claim' = 'fact') {
  const id = 'c3.' + key;
  if (s.day.records.some(r => r.key === id)) return;
  s.day.records.push({key:id,text,source,layer,event:s.revision});
  s[layer === 'fact' ? 'facts' : 'claims'].push(id); s.knowledge.push(id);
}
export function deliver(s: GameState, recipient: keyof GameState['npcs']|'rook'|'julian', key: string, text: string, source: string) {
  record(s, `delivery.${recipient}.${key}`, `${recipient} received: ${text}`, source);
  if (recipient !== 'rook' && recipient !== 'julian') s.npcs[recipient].known.push({key:text,source,event:s.revision});
  // New contacts use existing sourced records, without changing schema-5 NPC structure.
}
export const choice = (id: string, label: string, hint: string, next: string, apply?: NextChoice['apply']): NextChoice => ({id:'chapter3.'+id,label,hint,next,apply});
const hasRecord = (s: GameState, key: string) => s.day.records.some(r=>r.key===key);

export const nextSceneDefinitions: Record<string, {title:string;place:string;blocks:Block[]}> = {
  morningPlan:{title:'A question for the morning',place:'06:15 · Day two · Apartment',blocks:[p('The follow-up notice offers an 08:30 appointment with Voss, preliminary remote advice, or a later consultation. No procedure is booked. You read it beside the clothes you left out last night.')]},
  voss:{title:'If I do nothing',place:'08:30 · Clinical follow-up',blocks:[q('Dr Lena Voss','If you authorize nothing further, no further adaptation is authorized. Yesterday does not undo itself because you leave the next page blank. Care, assessment and another stage are separate decisions.')]},
  vossPlan:{title:'A plan without another procedure',place:'08:48 · Follow-up closes',blocks:[p('Voss leaves the authorization section blank. She offers a staffed records review at 14:00–15:00 today, concerning your release summary and its routing. Ordinary care remains available whether you take that appointment or not.')]},
  rook:{title:'A date, not an explanation',place:'10:10 · Unknown-number thread',blocks:[p('The unknown-number thread carries another message. There is no attachment.'),q('Unknown sender','Ask Voss for the date of the instruction to prepare Adrian Vale to assume the existing identity. Ask which office approved it. It was roughly two months before the breach. Check the record, not my word.')]},
  rookCompare:{title:'The date on the instruction',place:'10:24 · Patient-record extract',blocks:[p('The authenticated patient-record extract names Adrian Vale, preparation for the existing identity, and Executive Intelligence as the approving office. Voss confirms Sloane approved the instruction roughly two months before the breach. The release contains neither the complete program nor its purpose.')]},
  rookReply:{title:'What the sender gets back',place:'10:35 · Two separate threads',blocks:[p('The sender asks whether you checked. The patient-record request and this reply are separate transmissions. The monitored handset makes messages available to Axiom systems; it does not establish that Sloane personally read them.')]},
  informationEnd:{title:'The morning leaves a record',place:'10:45 · Information sequence complete',blocks:[p('You close the thread. A clinical question and a date now have separate sources. Neither source has answered every question.')]},
};
export function nextBlocks(s: GameState): Block[] {
  const scene=nextSceneDefinitions[s.phase];
  if(!scene)return [];
  const blocks=[...scene.blocks];
  if(s.phase==='voss')blocks.unshift(p(flag(s,'careMode')==='remote'
    ? 'This is a clinical call. Voss identifies herself and says no one else is in her room. Your handset remains monitored; she cannot certify your end as private. Without an examination she offers preliminary advice only.'
    : 'Voss meets you alone in Consultation 3. The door closes; no operational observer is present. With your permission the handset waits outside in a numbered locker. She explains that a clinical note will be retained in the medical system and an attendance entry routed to scheduling. This is a bounded consultation, not a promise that Axiom cannot access records.'));
  return blocks;
}
export function nextChoices(s: GameState): NextChoice[] {
  if(s.scene!=='chapter3')return [];
  if(s.phase==='nightComplete' && (s.contentRevision===13||s.contentRevision===14)) return [choice('begin-followup','Continue · If I do nothing','Begin the following morning. Prior decisions and history are preserved.','morningPlan')];
  if(s.contentRevision!==14)return [];
  const c:NextChoice[]=[];
  const once=(key:string, label:string,hint:string,next:string,apply:NonNullable<NextChoice['apply']>)=>{if(!flag(s,key))c.push(choice(key,label,hint,next,x=>{mark(x,key);return apply(x);}));};
  if(s.phase==='morningPlan'){
    if(hasRecord(s,'chapter3.next-contact')&&!flag(s,'morning-contact'))return [
      choice('morning-call','Make the agreed 06:45 call','Tell Maya only that you are awake; no new medical or operational disclosure.','morningPlan',x=>{mark(x,'morning-contact','called');deliver(x,'maya','morning','I am awake. I kept our call.','Delivered 06:45 call');return [q('You','I am awake. I kept our call.'),q('Maya','You did. We can speak again when you know what you want to tell me.'),p('You finish the call before opening the appointment notice again.')];}),
      choice('morning-cancel','Cancel the agreed call by message','Maya receives the cancellation, not a hidden reason.','morningPlan',x=>{mark(x,'morning-contact','cancelled');deliver(x,'maya','morning','I cannot make our 06:45 call.','Delivered cancellation');return [q('Maya · reply','Received. Let me know if you want another time.')];}),
    ];
    for(const [mode,label] of [['attend','Attend the follow-up'],['remote','Ask for preliminary remote advice'],['defer','Defer the appointment']] as const)c.push(choice('care-'+mode,label,'No additional adaptation is authorized.',mode==='defer'?'vossPlan':'voss',x=>{mark(x,'careMode',mode);deliver(x,'voss','care-mode',mode==='defer'?'I am deferring the appointment.':mode==='remote'?'I request preliminary advice by call.':'I will attend the follow-up.','Appointment reply');return [p(mode==='attend'?'You dress, collect your belongings, travel to the clinic and check in. The desk records attendance, not the questions you intend to ask.':mode==='remote'?'At 08:30 you answer Voss’s clinical line from the apartment.':'The scheduling desk acknowledges deferral. No examination or intervention takes place. Voss’s records-review invitation remains available by message.')];}));
  }
  if(s.phase==='voss'){
    once('medical','Ask what may reverse, persist, or change with time','Distinguish a prognosis from a guarantee.','voss',x=>{record(x,'prognosis','Voss says Stage One is described as mostly reversible, not self-reversing. Restoration requires individual assessment and further treatment; some changes may persist. Time makes reassessment useful but she gives no guaranteed outcome or deadline.','Voss clinical prognosis, explicitly qualified','claim');deliver(x,'voss','medical-question','What happens if I do nothing?','Current consultation');return [q('Voss','Mostly reversible is not a guarantee that every feature returns, or that waiting restores it. We would assess your present condition before considering restoration. Time is a reason to reassess, not a deadline that lets me sign for you.')];});
    once('monitoring','Separate medical monitoring from operational reporting','Ask which requests are clinical and which are Axiom policy.','voss',x=>{record(x,'monitoring-scope','Voss recommends aftercare questions about movement, fatigue and voice; Axiom scheduling requests attendance. An operational availability request is not a clinical finding.','Voss identifies current brief and professional recommendation','claim');return [q('Voss','Movement, fatigue and voice are relevant to aftercare. My recommendation is a follow-up assessment. Scheduling asks whether you attended. An operational request that you remain available does not become a medical need because it arrives on the same cover sheet.')];});
    once('later-stages','Ask what later EVE stages would involve','Information only; no Stage Two consent.','voss',x=>{record(x,'later-stages','Later adaptation would require a separate assessment, explanation of proposed changes and risks, and affirmative authorization. ORACLE prediction is not prognosis or consent. Voss refuses blanket advance authorization.','Voss current professional boundary');return [q('Voss','Further adaptation would be another intervention, with its own proposed changes and risks. I will not authorize an unspecified stage, and I will not treat an ORACLE prediction as your permission or as a clinical guarantee.')];});
    once('confidential','Ask a limited confidentiality question','Ask about this appointment’s access; disclose no Maya or Sloane exchange.','voss',x=>{record(x,'privacy-now',flag(x,'careMode')==='remote'?'Voss cannot guarantee confidentiality on the monitored handset.':'Voss is alone in Consultation 3; clinical notes persist and attendance is separately routed. No promise of inaccessible records.','Current appointment privacy explanation');return [q('Voss','I can limit this discussion to care and tell you what I record. I cannot promise that every institutional system is beyond access. Ask the limited question on that understanding.')];});
    for(const [id,label,answer] of [['aftercare','Request monitoring only','Aftercare only. No further adaptation.'],['reversal','Request reversal information','An assessment of restoration options, not permission to perform restoration.'],['information','Request more EVE information','Information about later proposals only, not authorization.'],['refuse','Refuse additional intervention','No additional intervention.'],['future','Request a future consultation','Arrange a later clinical consultation; no procedure today.']] as const)c.push(choice('plan-'+id,label,answer,'vossPlan',x=>{mark(x,'medical-plan',id);record(x,'care-plan',answer,'Evelynn’s explicit request and Voss acknowledgment');deliver(x,'voss','plan',answer,'Current consultation');return [q('You',answer),q('Voss','I will record that scope. It authorizes nothing beyond what you just asked.'),p(flag(x,'careMode')==='attend'?'You retrieve the handset from the locker, collect your coat and leave the clinic.':'You end the clinical call.')];}));
  }
  if(s.phase==='vossPlan')for(const reserve of [true,false])c.push(choice(reserve?'reserve-review':'defer-review',reserve?'Reserve the 14:00 records review':'Leave records review available without reserving','A records session is not medical treatment.','rook',x=>{mark(x,'voss-window',reserve?'reserved':'offered');deliver(x,'voss','records-window',reserve?'Please reserve 14:00–15:00 for records review.':'I am not reserving the records window yet.','Scheduling message');record(x,'sender-claim','Unknown sender alleges a preparation instruction predating the breach by roughly two months.','Unknown-number message; unverified','claim');return [q('Voss · message',reserve?'Reserved, 14:00–15:00. You may cancel.':'The window remains available if you request it before committing elsewhere.')];}));
  if(s.phase==='rook'){
    c.push(choice('verify-date','Request the extract from Voss','Ask only for approval date and approving office; do not disclose the sender.','rookCompare',x=>{mark(x,'verified-date');deliver(x,'voss','date-request','Please confirm the preparation instruction date and approving office in my patient record.','Delivered patient-record request');record(x,'instruction','Authenticated extract: preparation for Adrian Vale to assume the existing identity was approved by Sloane’s Executive Intelligence office roughly two months before the breach.','Voss patient-record extract and authenticated clinical reply');x.proof.push({key:'c3.instruction',source:'Patient-record extract authenticated by Voss',owner:'Evelynn'});return [q('Voss · reply','I can release that portion of your record. It identifies the approving office and date; it does not explain why that decision was made.')];}));
    c.push(choice('defer-date','Keep the message as an unverified claim','No record request or confirmation is sent.','rookReply'));
  }
  if(s.phase==='rookCompare'){
    c.push(choice('compare-date','Compare the approval with the breach','Establish chronology, not the complete program motive.','rookReply',x=>{mark(x,'compared-date');record(x,'omission','The identity-preparation instruction predates the breach. Sloane’s emergency framing omitted that earlier approval; the record does not establish her ultimate motive.','Private comparison of released instruction with the known breach chronology');return [p(x.clinic.exam==='equipment'?'The calibration finding already placed preparation twenty-three days earlier. This goes further back and identifies the approving office.':'The approval predates the emergency that framed Sloane’s offer. You mark the dates without filling the space between them with a theory.')];}));
    c.push(choice('retain-extract','Retain the extract without deciding its meaning','The authenticated document remains available.','rookReply'));
  }
  if(s.phase==='rookReply'){
    once('ask-source','Demand the sender’s source','The sender hears the question; authenticity does not establish full candor.','rookReply',x=>{deliver(x,'rook','source-question','How did you get this?','Delivered unknown-thread reply');record(x,'sender-selective','Sender refuses to identify the source and tells Evelynn to check the date first.','Unknown sender reply','claim');return [q('Unknown sender','Check the date before you decide what to do with me. I am not giving you the rest of the chain.')];});
    once('report-rook','Report the contact and exact claim to Sloane','Transmit the existence of the sender and date claim, not the full patient record.','rookReply',x=>{deliver(x,'sloane','sender','An unknown sender told me to ask about a preparation instruction from roughly two months before the breach.','Explicit delivered report');return [q('Sloane · reply','I have your report. Retain the message. I am not providing a program history on this channel.')];});
    once('partial-rook','Tell Sloane only that you requested a date','Do not identify the sender or transmit the extract.','rookReply',x=>{deliver(x,'sloane','date-query','I requested the date of a clinical preparation instruction.','Explicit limited report');return [q('Sloane · reply','Your request is noted.')];});
    if(flag(s,'verified-date'))once('confirm-rook','Confirm only that the date checked out','Sender learns verification occurred, not your clinical plan.','rookReply',x=>{deliver(x,'rook','verified','The date checked out.','Delivered reply');return [q('Unknown sender','Then you have one omission you can name. It is not the whole answer.')];});
    once('misdirect-rook','Tell the sender you sent everything to Sloane','Send this exact claim. It may conflict with the actual limited or absent report.','rookReply',x=>{deliver(x,'rook','account','I sent everything to Sloane.','Evelynn’s delivered assertion; not verification of forwarding');record(x,'rook-account','Evelynn told the sender she sent everything to Sloane. No attachment was sent by this action.','Transmission record, distinct from truth of the assertion');return [q('Unknown sender','That was your decision. Do not ask me to mistake it for proof.')];});
    c.push(choice('keep-source','Retain the sender as a private source','Close without another transmission; no guarantee of secrecy from system access.','informationEnd',x=>{mark(x,'rook-window','offered');return [p('You retain the thread. An optional 18:00–18:30 contact window arrives; you have not agreed to it.')];}));
    c.push(choice('close-source','Close without a further reply','No source relationship or appointment is accepted.','informationEnd'));
  }
  return c;
}

export function applyNextChoice(state: GameState, id:string): GameState {
  const c=nextChoices(state).find(c=>c.id===id); if(!c)return state;
  const s=structuredClone(state);s.revision++;s.contentRevision=14;
  const blocks=c.apply?.(s)??[];
  s.history.push({node:`chapter3.${state.phase}` as NodeId,blocks:[q('You',c.label),...blocks]});
  s.phase=c.next;s.feedback='';
  s.history.push({node:`chapter3.${s.phase}` as NodeId,blocks:nextBlocks(s)});
  s.ledger.push({sequence:s.revision,action:{type:'CHAPTER3_CHOOSE',id,expectedRevision:state.revision}});
  return s;
}
