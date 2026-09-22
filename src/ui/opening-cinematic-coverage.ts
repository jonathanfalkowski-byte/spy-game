import type { NodeId } from '../content/schema';
import production from './approved-scene-art.json';
import { shotBindings } from './scene-art';

export const OPENING_CINEMATIC_STATUSES = [
  'RUNTIME_APPROVED',
  'COMPONENT_ONLY',
  'STAGING',
  'MISSING',
] as const;
export type OpeningCinematicStatus = (typeof OPENING_CINEMATIC_STATUSES)[number];

export type OpeningCinematicCut = {
  shotId: string;
  trigger: string;
  node: NodeId;
  location: string;
  characters: readonly string[];
  props?: readonly string[];
  reasonForCut: string;
  requiredAssetStatus: OpeningCinematicStatus;
  referenceAssetId?: string;
  statusNote?: string;
};

/** Every authored opening cut that must be covered before a visual-complete release. */
export const OPENING_CINEMATIC_CUTS: readonly OpeningCinematicCut[] = [
  {
    shotId: 'opening.apartment.inspect-lease',
    trigger: 'Player inspects the Axiom housing notice.',
    node: 'apartment.reply',
    location: 'Adrian’s apartment',
    characters: ['Adrian'],
    props: ['Axiom housing notice'],
    reasonForCut: 'The authored inspection changes focus from the room to a readable evidence object.',
    requiredAssetStatus: 'RUNTIME_APPROVED',
  },
  {
    shotId: 'opening.apartment.inspect-medical',
    trigger: 'Player inspects the annual medical package.',
    node: 'apartment.reply',
    location: 'Adrian’s apartment',
    characters: ['Adrian'],
    props: ['Annual endocrine screening package'],
    reasonForCut: 'The authored inspection changes focus to a distinct evidence object.',
    requiredAssetStatus: 'RUNTIME_APPROVED',
  },
  {
    shotId: 'opening.axiom.shot01-approach',
    trigger: 'Adrian leaves the apartment and approaches Axiom through the rain.',
    node: 'commute.arrival',
    location: 'Axiom exterior and employee entrance',
    characters: ['Adrian'],
    props: ['Phone', 'usual coat'],
    reasonForCut: 'Location and time move from the apartment to the Axiom approach.',
    requiredAssetStatus: 'MISSING',
  },
  {
    shotId: 'opening.axiom.shot02-security',
    trigger: 'Adrian joins the lobby queue and reaches the screening lanes.',
    node: 'commute.arrival',
    location: 'Axiom security lobby',
    characters: ['Adrian', 'Security guards'],
    props: ['Screening lanes', 'Cameras', 'Locked gates'],
    reasonForCut: 'The security queue and its architectural anchors become the active space.',
    requiredAssetStatus: 'STAGING',
    statusNote: 'A lobby environment study exists, but no exact runtime-approved Adrian composition is bound.',
  },
  {
    shotId: 'opening.axiom.shot03-office-arrival',
    trigger: 'Screening clears; Adrian recovers his coat and phone and reaches Strategic Intelligence.',
    node: 'commute.arrival',
    location: 'Axiom inner gate, elevator and Strategic Intelligence floor',
    characters: ['Adrian'],
    props: ['Phone', 'Usual coat', 'Employee badge', 'Security tray'],
    reasonForCut: 'The authored action crosses the inner gate and changes the scene from security to the office corridor.',
    requiredAssetStatus: 'RUNTIME_APPROVED',
    referenceAssetId: 'axiom-office-arrival-v1-production',
    statusNote: 'Office Arrival V1 is a dedicated owner-approved runtime asset. M5 remains a separate component-only environment authority.',
  },
  {
    shotId: 'opening.office.shot01-daniel',
    trigger: 'Daniel is waiting beside Adrian’s desk after the elevator doors open.',
    node: 'office.daniel',
    location: 'Strategic Intelligence desk',
    characters: ['Adrian', 'Daniel'],
    reasonForCut: 'Daniel becomes an active participant at the desk.',
    requiredAssetStatus: 'RUNTIME_APPROVED',
    referenceAssetId: 'axiom-opening-office-shot01-daniel-v1-production',
    statusNote: 'Owner-approved Daniel-focused shared-HOLD composite; Adrian remains off-frame until Approach your desk.',
  },
  {
    shotId: 'opening.office.shot02-benton',
    trigger: 'Daniel leaves and Benton crosses the floor with the black data slate.',
    node: 'office.benton',
    location: 'Strategic Intelligence desk',
    characters: ['Adrian', 'Benton'],
    props: ['Black data slate'],
    reasonForCut: 'The active participant changes from Daniel to Benton and the assignment prop enters.',
    requiredAssetStatus: 'RUNTIME_APPROVED',
    referenceAssetId: 'axiom-opening-office-shot02-benton-v1-production',
    statusNote: 'Owner-approved bounded medium desk-side composition; Adrian remains off-screen and no full-figure/feet authority is claimed.',
  },
  {
    shotId: 'opening.office.shot03-file',
    trigger: 'Benton leaves; the Helix acquisition file wakes on the slate.',
    node: 'office.departure',
    location: 'Adrian’s Strategic Intelligence desk',
    characters: ['Adrian', 'Benton'],
    props: ['Helix acquisition file', 'Black data slate'],
    reasonForCut: 'The authored file/action staging changes the desk focus after Benton departs.',
    requiredAssetStatus: 'MISSING',
  },
  {
    shotId: 'opening.helix.shot01-brief',
    trigger: 'Adrian opens the Helix acquisition brief.',
    node: 'helix.brief',
    location: 'Axiom casework workstation',
    characters: ['Adrian'],
    props: ['Helix acquisition brief', 'Terminal'],
    reasonForCut: 'The brief becomes the active casework surface.',
    requiredAssetStatus: 'MISSING',
  },
  {
    shotId: 'opening.helix.shot02-documents',
    trigger: 'Adrian opens the source-record workspace.',
    node: 'helix.documents',
    location: 'Axiom casework workstation',
    characters: ['Adrian'],
    props: ['Source records', 'Terminal'],
    reasonForCut: 'The authored transition changes from the brief to the evidence workspace.',
    requiredAssetStatus: 'MISSING',
  },
  {
    shotId: 'opening.helix.shot03-review',
    trigger: 'Adrian enters assessment review before sending the report.',
    node: 'helix.review',
    location: 'Axiom assessment workstation',
    characters: ['Adrian'],
    props: ['Assessment attachments', 'Terminal'],
    reasonForCut: 'The authored work mode changes from analysis to final review.',
    requiredAssetStatus: 'MISSING',
  },
  {
    shotId: 'opening.helix.shot04-submitted',
    trigger: 'The report is transmitted to Benton only.',
    node: 'helix.submitted',
    location: 'Axiom assessment workstation',
    characters: ['Adrian'],
    props: ['Submitted report', 'Terminal'],
    reasonForCut: 'Submission is a completed authored action with a new report state.',
    requiredAssetStatus: 'MISSING',
  },
  {
    shotId: 'opening.maya.shot01-coffee',
    trigger: 'Maya enters carrying two paper cups and sets one beside Adrian’s terminal.',
    node: 'maya.promotion',
    location: 'Strategic Intelligence desk',
    characters: ['Adrian', 'Maya'],
    props: ['Two paper cups', 'Terminal'],
    reasonForCut: 'Maya becomes a new active participant and the coffee exchange changes the desk state.',
    requiredAssetStatus: 'RUNTIME_APPROVED',
    referenceAssetId: 'axiom-opening-office-shot01-maya-v1-production',
    statusNote: 'Delegated design-approved bounded medium conversation frame; Maya faces off-screen Adrian and cup custody remains exact for the three HOLD beats.',
  },
  {
    shotId: 'opening.maya.shot02-departure',
    trigger: 'Maya lifts her coffee and leaves toward compliance.',
    node: 'maya.goodbye',
    location: 'Strategic Intelligence desk and compliance corridor',
    characters: ['Adrian', 'Maya'],
    props: ['Maya’s coffee', 'Adrian’s retained coffee'],
    reasonForCut: 'Maya physically departs and the participant movement changes the composition.',
    requiredAssetStatus: 'MISSING',
  },
  {
    shotId: 'opening.office.shot04-alone',
    trigger: 'The opening milestone settles after Maya leaves.',
    node: 'ending.complete',
    location: 'Strategic Intelligence desk',
    characters: ['Adrian'],
    props: ['Adrian’s retained coffee', 'Submitted Helix report'],
    reasonForCut: 'The active participant set changes to Adrian alone.',
    requiredAssetStatus: 'RUNTIME_APPROVED',
    referenceAssetId: 'axiom-opening-office-shot04-alone-v1-production',
    statusNote: 'Delegated design-approved bounded Adrian-alone sip frame; exact ending shot only, with no sitting or full-body authority.',
  },
] as const;

export type OpeningCinematicHold = {
  shotId: string;
  nodes: readonly NodeId[];
  characters: readonly string[];
  reasonForHold: string;
};

export const OPENING_CINEMATIC_HOLDS: readonly OpeningCinematicHold[] = [
  {
    shotId: 'opening.office.shot01-daniel',
    nodes: ['office.daniel'],
    characters: ['Adrian', 'Daniel'],
    reasonForHold: 'Daniel’s dialogue continues without a participant, location, prop or position change.',
  },
  {
    shotId: 'opening.office.shot02-benton',
    nodes: ['office.benton'],
    characters: ['Adrian', 'Benton'],
    reasonForHold: 'Benton’s assignment dialogue continues at Adrian’s desk with the slate in the same staging.',
  },
  {
    shotId: 'opening.maya.shot01-coffee',
    nodes: ['maya.invitation', 'maya.case'],
    characters: ['Adrian', 'Maya'],
    reasonForHold: 'Maya’s invitation and case questions continue with both cups and positions unchanged.',
  },
  {
    shotId: 'opening.helix.shot02-documents',
    nodes: ['helix.analysis'],
    characters: ['Adrian'],
    reasonForHold: 'Reading, connecting and reviewing evidence stay at the same casework workstation.',
  },
] as const;

const approvedAssetIds = new Set(production.map((asset) => asset.id));

function effectiveStatus(cut: OpeningCinematicCut): OpeningCinematicStatus {
  const binding = shotBindings[cut.shotId];
  if (binding && approvedAssetIds.has(binding.assetId)) return 'RUNTIME_APPROVED';
  return cut.requiredAssetStatus === 'RUNTIME_APPROVED' ? 'MISSING' : cut.requiredAssetStatus;
}

export type OpeningCinematicCoverageReport = {
  cuts: readonly (OpeningCinematicCut & { effectiveStatus: OpeningCinematicStatus; boundAssetId?: string })[];
  requiredShots: number;
  runtimeApproved: number;
  componentOnly: number;
  staging: number;
  missing: number;
  complete: boolean;
  missingShotIds: readonly string[];
  incompleteShotIds: readonly string[];
};

export function openingCinematicCoverageReport(): OpeningCinematicCoverageReport {
  const cuts = OPENING_CINEMATIC_CUTS.map((cut) => ({
    ...cut,
    effectiveStatus: effectiveStatus(cut),
    boundAssetId: shotBindings[cut.shotId]?.assetId,
  }));
  const count = (status: OpeningCinematicStatus) =>
    cuts.filter((cut) => cut.effectiveStatus === status).length;
  const missingShotIds = cuts
    .filter((cut) => cut.effectiveStatus === 'MISSING')
    .map((cut) => cut.shotId);
  const incompleteShotIds = cuts
    .filter((cut) => cut.effectiveStatus !== 'RUNTIME_APPROVED')
    .map((cut) => cut.shotId);
  return {
    cuts,
    requiredShots: cuts.length,
    runtimeApproved: count('RUNTIME_APPROVED'),
    componentOnly: count('COMPONENT_ONLY'),
    staging: count('STAGING'),
    missing: count('MISSING'),
    complete: incompleteShotIds.length === 0,
    missingShotIds,
    incompleteShotIds,
  };
}

export function formatOpeningCinematicCoverageReport(
  report = openingCinematicCoverageReport(),
) {
  const lines = [
    'OPENING CINEMATIC COVERAGE',
    `required shots: ${report.requiredShots}`,
    `runtime approved: ${report.runtimeApproved}`,
    `component-only: ${report.componentOnly}`,
    `staging: ${report.staging}`,
    `missing: ${report.missing}`,
    `status: ${report.complete ? 'COMPLETE' : 'INCOMPLETE'}`,
    'missing shots:',
    ...(report.missingShotIds.length ? report.missingShotIds.map((id) => `- ${id}`) : ['- none']),
    'not runtime-approved:',
    ...(report.incompleteShotIds.length
      ? report.incompleteShotIds.map((id) => `- ${id}`)
      : ['- none']),
  ];
  return lines.join('\n');
}
