import { records5 } from '../content/chapter5-model';
import { records4 } from '../content/chapter4-model';
import type { GameState } from '../state/schema';
import { documents, searches } from '../content/evidence';
import { inspections } from '../content/scenes';
import { reasoningText, sourceNames, findings, leadNames } from '../content/mission';
import { displayName } from './reading-presentation';
export const milestoneNames = {
  opening: 'The opening',
  day: 'The rest of Adrian’s day',
  clinic: 'Sublevel 17',
  mission: 'The Glass House',
  chapter3: 'Second Skin',
  chapter4: 'Private Access',
  chapter5: 'The Beautiful Life',
};
export type Milestone = keyof typeof milestoneNames;
export const informationNames = {
  fact: 'Observed facts',
  claim: 'Attributed claims',
  assessment: 'Your assessments',
  capture: 'Captured evidence and assets',
};
export function milestoneOf(s: GameState): Milestone {
  if (
    s.scene === 'clinic' ||
    s.scene === 'mission' ||
    s.scene === 'chapter3' ||
    s.scene === 'chapter4' ||
    s.scene === 'chapter5'
  )
    return s.scene;
  return ['apartment', 'commute', 'office', 'helix', 'maya', 'ending'].includes(s.scene)
    ? 'opening'
    : 'day';
}
export interface JournalEntry {
  id: string;
  milestone: Milestone;
  type: keyof typeof informationNames;
  title: string;
  text: string;
  source: string;
  limits?: string;
}
const titles: Record<string, string> = {
  anomaly: 'The uninvited file',
  'file.report': 'The report to Security',
  'file.delete': 'The file returns',
  'file.trace': 'An origin bearing your name',
  directory: 'The directory identifiers',
  biometric_access: 'The biometric authorization',
  security_arrival: 'Security arrives',
  device_taken: 'Phone confiscated',
  suspension: 'Access suspended',
  maya_warning: 'The warning sent to Maya',
  allegation: 'Sloane’s allegation',
  maya_lookup: 'Maya’s directory lookup',
  glasshouse_claim: 'A meeting at the Glass House',
  'question.insider': 'Sloane’s account of the source',
  'question.why': 'Why an analyst?',
  evelyn_package: 'Axiom’s Evelynn Vale identity package',
  mission: 'Sloane’s assignment',
  offer: 'The terms of the offer',
  termination: 'Employment and housing notice',
  accepted: 'Acceptance under coercion',
  appointment: 'The seven o’clock appointment',
  monitoring: 'The phone warning',
  walkaway: 'Departure from Axiom',
  evening_cancelled: 'The cancelled evening',
  evening_disclosure: 'What you told Maya',
  evening_closure: 'Your last words that evening',
  'clinic.privateAuthority': 'Voss’s authority',
  'clinic.exam.terminal': 'Separate stage authorizations',
  'clinic.exam.equipment': 'Calibration twenty-three days earlier',
  'clinic.exam.scan': 'Employee screening data reused',
  'clinic.protocol': 'The limits of Stage One',
  'clinic.profile': 'Your confirmed profile',
  'clinic.authorized': 'Stage One authorized',
  'clinic.voiceStage': 'The changed voice',
  'clinic.faceStage': 'The face checkpoint',
  'clinic.complete': 'Stage One completed',
  'clinic.presentation': 'Your chosen presentation',
  'clinic.rehearsal': 'Rehearsal feedback',
  'clinic.equipment': 'Equipment issued',
  'clinic.departure': 'Leaving the clinic',
  'clinic.stopped': 'Treatment stopped',
  'clinic.referral': 'The referral after stopping',
  'mission.singapore': 'Marcus remembers Singapore',
  'mission.marcus-memory': 'Marcus’s recollection',
  'mission.celeste-greeting': 'Celeste’s greeting',
  'mission.halcyon-mention': 'A mention of Halcyon',
  'mission.transfer': 'What you saw at the table',
  'mission.exposure': 'Marcus signals security',
  'mission.sloane-test': 'Sloane’s account of the other objective',
  'mission.recoverable': 'Sloane says the exchange was recoverable',
  'mission.debrief.end': 'Unknown warning: Benton was not the test',
  'mission.warning.next1': 'Unknown warning: you were the test',
  'mission.warning.next2': 'Unknown claim: Sloane could have stopped it',
  'warning.begin': 'Unknown warning: do not go to Sublevel 17',
  'warning.next': 'Unknown warning: the photograph',
  'warning.last': 'Unknown claim: she is not you',
  'clinic.privacy': 'Who remained for the examination',
  'clinic.morning': 'The morning contact decision',
  'morning.answer.message': 'The check-in you answered',
  'morning.message.message': 'Your departure message to Maya',
  'contact.brief.message': 'Recovery message without identity details',
  'contact.identity.message': 'Your adaptation disclosure to Maya',
};
export function journalEntries(s: GameState): JournalEntry[] {
  const entries: JournalEntry[] = [];
  for (const i of inspections.filter((i) => s.inspected.includes(i.id)))
    entries.push({
      id: i.id,
      milestone: 'opening',
      type: 'fact',
      title: i.title,
      text: i.text,
      source: 'Adrian’s apartment inspection',
    });
  for (const d of documents.filter((d) => s.documents.includes(d.id)))
    entries.push({
      id: d.id,
      milestone: 'opening',
      type: d.layer,
      title: d.title,
      text: d.summary,
      source: d.source,
      limits: d.limits,
    });
  for (const r of searches.filter((r) => s.investigation === r.id))
    entries.push({
      id: r.id,
      milestone: 'opening',
      type: 'fact',
      title: r.title,
      text: r.result,
      source: 'Adrian’s follow-up investigation',
      limits: r.limits,
    });
  if (s.claims.includes('compliance_cleared'))
    entries.push({
      id: 'compliance',
      milestone: 'opening',
      type: 'claim',
      title: 'Maya’s compliance review',
      text: 'Maya says compliance cleared the acquisition as routine two weeks ago.',
      source: 'Maya, during the office conversation',
    });
  for (const r of s.day.records) {
    if (r.key === 'mission.capture') continue;
    const action = s.ledger[r.event - 1]?.action.type;
    const milestone: Milestone =
      action === 'CHAPTER3_CHOOSE'
        ? 'chapter3'
        : action === 'MISSION_CHOOSE'
          ? 'mission'
          : action === 'CLINIC_CHOOSE'
            ? 'clinic'
            : 'day';
    const lead = r.key.startsWith('mission.lead.')
      ? (r.key.split('.').at(-1) as keyof typeof findings)
      : undefined;
    const title = lead
      ? leadNames[lead]
      : (titles[r.key] ??
        (r.key.includes('warning')
          ? 'A message from the unknown sender'
          : r.key.endsWith('.message')
            ? 'Your message to Maya'
            : r.source.split(' · ')[0]));
    entries.push({
      id: r.key,
      milestone,
      type: r.layer,
      title,
      text: r.key.startsWith('c3.delivery.')
        ? r.text.replace(/\brook received:/g, 'Unknown sender received:')
        : r.text,
      source: r.source,
      limits: lead
        ? findings[lead].limits
        : r.layer === 'claim'
          ? 'Records the source’s account; it is not independent confirmation.'
          : undefined,
    });
  }
  for (const i of s.inferences)
    entries.push({
      id: 'connection' + i.event,
      milestone: 'opening',
      type: 'assessment',
      title: i.pair
        .split('|')
        .map((id) => documents.find((d) => d.id === id)!.title)
        .join(' + '),
      text: 'Selected relationship: ' + i.relation + '. ' + i.text,
      source: 'Adrian’s comparison of the selected records',
    });
  if (s.report)
    entries.push({
      id: 'report',
      milestone: 'opening',
      type: 'assessment',
      title: 'Submitted Helix assessment',
      text: s.report.text + ' ' + s.report.feedback,
      source: 'Adrian’s report, sent to Benton only',
    });
  if (s.mission.source)
    entries.push({
      id: 'mission-assessment',
      milestone: 'mission',
      type: 'assessment',
      title: 'The name given to Sloane',
      text: sourceNames[s.mission.source] + '. ' + reasoningText(s),
      source: 'Adrian’s submitted assessment',
    });
  if (s.mission.capture) {
    const c = s.mission.capture;
    entries.push({
      id: 'capture',
      milestone: 'mission',
      type: 'capture',
      title: {
        substantive: 'Recorded agreement — Sloane’s copy',
        fragment: 'Recording fragments — agreement missed',
        transfer: 'Photograph of the wafer handover',
        contact: 'Photograph of contact — handover missed',
        asset: 'Benton’s access token — potential leverage',
        none: 'Failed token attempt — nothing retained',
      }[c.quality],
      text: c.text,
      source: 'Held by: ' + displayName(c.owner) + '. ' + displayName(c.axiomAccess),
      limits: c.limits,
    });
  }
  for (const record of records4(s))
    entries.push({
      id: record.key,
      milestone: 'chapter4',
      type: s.proof.some((p) => p.key === record.key) ? 'capture' : record.layer,
      title: record.key.startsWith('c4.sent-')
        ? 'Delivered message'
        : record.key.slice(3).replaceAll('-', ' '),
      text: record.text.replace(/^rook received:/, 'Unknown sender received:'),
      source: record.source,
    });
  for (const r of records5(s))
    entries.push({
      id: r.key,
      milestone: 'chapter5',
      type: r.layer,
      title: r.key.startsWith('c5.sent-')
        ? 'Delivered message'
        : r.key.slice(3).replaceAll('-', ' '),
      text: r.text,
      source: r.source,
    });
  return entries.map((e) => ({
    ...e,
    title: displayName(e.title),
    text: displayName(e.text),
    source: displayName(e.source),
    ...(e.limits ? { limits: displayName(e.limits) } : {}),
  }));
}
