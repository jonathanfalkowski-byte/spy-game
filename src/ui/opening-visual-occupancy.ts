import type { NodeId } from '../content/schema';
import type { GameState } from '../state/schema';
import { nodeOf } from '../state/reducer';
import production from './approved-scene-art.json';
import { openingReadingBeats } from './opening-beats';
import {
  OPENING_CINEMATIC_CUTS,
  OPENING_CINEMATIC_STATUSES,
  openingCinematicCoverageReport,
  type OpeningCinematicStatus,
} from './opening-cinematic-coverage';
import { shotBindings } from './scene-art';

export const OPENING_VISUAL_MODES = ['CUT', 'HOLD'] as const;
export type OpeningVisualMode = (typeof OPENING_VISUAL_MODES)[number];

export type OpeningVisualScreenSpec = {
  screenId: string;
  node: NodeId;
  readingBeat?: string;
  visibleTextEvent?: string;
  visualMode: OpeningVisualMode;
  resolvedShotId: string;
  holdSource?: string;
  activeCharacters: readonly string[];
  reason: string;
};

/**
 * Canonical opening reader corridor. The commute entry is expanded into its
 * four authored reading beats; dialogue-only nodes remain HOLDs of the last
 * meaningful shot. Apartment inspection variants are resolved dynamically
 * because the same insert can be reached from bond or reply.
 */
export const OPENING_VISUAL_SCREEN_SPECS: readonly OpeningVisualScreenSpec[] = [
  {
    screenId: 'opening.apartment.bond',
    node: 'apartment.bond',
    visualMode: 'CUT',
    resolvedShotId: 'opening.apartment.shot01-mirror',
    activeCharacters: ['Adrian'],
    reason: 'The opening begins in Adrian’s apartment.',
  },
  {
    screenId: 'opening.apartment.reply',
    node: 'apartment.reply',
    visualMode: 'HOLD',
    resolvedShotId: 'opening.apartment.shot01-mirror',
    holdSource: 'opening.apartment.shot01-mirror',
    activeCharacters: ['Adrian'],
    reason: 'Maya’s message continues without a location, participant or room-state change.',
  },
  {
    screenId: 'opening.apartment.departure',
    node: 'apartment.departure',
    visualMode: 'HOLD',
    resolvedShotId: 'opening.apartment.shot01',
    holdSource: 'opening.apartment.shot01',
    activeCharacters: ['Adrian'],
    reason: 'The tower is waiting in the same apartment immediately before the authored departure.',
  },
  {
    screenId: 'opening.commute.arrival.01-approach',
    node: 'commute.arrival',
    readingBeat: 'approach',
    visibleTextEvent: 'Travel and exterior arrival at Axiom through the rain.',
    visualMode: 'CUT',
    resolvedShotId: 'opening.axiom.shot01-approach',
    activeCharacters: ['Adrian'],
    reason: 'The authored action leaves the apartment and moves outside toward Axiom.',
  },
  {
    screenId: 'opening.commute.arrival.02-security',
    node: 'commute.arrival',
    readingBeat: 'security',
    visibleTextEvent:
      'Lobby screening lanes, belongings tray, badge reader, face camera and locked gates.',
    visualMode: 'CUT',
    resolvedShotId: 'opening.axiom.shot02-security',
    activeCharacters: ['Adrian', 'Security guards'],
    reason: 'The security lobby and screening lanes become the active space.',
  },
  {
    screenId: 'opening.commute.arrival.03-office-arrival',
    node: 'commute.arrival',
    readingBeat: 'office arrival',
    visibleTextEvent: 'Adrian collects his coat and phone, clears the inner gate and reaches Strategic Intelligence.',
    visualMode: 'CUT',
    resolvedShotId: 'opening.axiom.shot03-office-arrival',
    activeCharacters: ['Adrian'],
    reason: 'Adrian crosses the inner gate and reaches Strategic Intelligence.',
  },
  {
    screenId: 'opening.commute.arrival.04-daniel',
    node: 'commute.arrival',
    readingBeat: 'Daniel waiting',
    visibleTextEvent: 'Daniel is waiting beside Adrian’s desk.',
    visualMode: 'CUT',
    resolvedShotId: 'opening.office.shot01-daniel',
    activeCharacters: ['Adrian', 'Daniel'],
    reason: 'Daniel becomes an active participant beside Adrian’s desk.',
  },
  {
    screenId: 'opening.office.daniel',
    node: 'office.daniel',
    visualMode: 'HOLD',
    resolvedShotId: 'opening.office.shot01-daniel',
    holdSource: 'opening.office.shot01-daniel',
    activeCharacters: ['Adrian', 'Daniel'],
    reason: 'Daniel’s dialogue continues in the same desk staging after his arrival beat.',
  },
  {
    screenId: 'opening.office.benton',
    node: 'office.benton',
    visualMode: 'CUT',
    resolvedShotId: 'opening.office.shot02-benton',
    activeCharacters: ['Adrian', 'Benton'],
    reason: 'Daniel leaves and Benton becomes the active participant with the slate.',
  },
  {
    screenId: 'opening.office.departure',
    node: 'office.departure',
    visualMode: 'CUT',
    resolvedShotId: 'opening.office.shot03-file',
    activeCharacters: ['Adrian', 'Benton'],
    reason: 'The Helix file wakes on the slate and changes the authored desk staging.',
  },
  {
    screenId: 'opening.helix.brief',
    node: 'helix.brief',
    visualMode: 'CUT',
    resolvedShotId: 'opening.helix.shot01-brief',
    activeCharacters: ['Adrian'],
    reason: 'The Helix brief becomes the active casework surface.',
  },
  {
    screenId: 'opening.helix.documents',
    node: 'helix.documents',
    visualMode: 'CUT',
    resolvedShotId: 'opening.helix.shot02-documents',
    activeCharacters: ['Adrian'],
    reason: 'The source-record workspace replaces the brief as the active evidence surface.',
  },
  {
    screenId: 'opening.helix.analysis',
    node: 'helix.analysis',
    visualMode: 'HOLD',
    resolvedShotId: 'opening.helix.shot02-documents',
    holdSource: 'opening.helix.shot02-documents',
    activeCharacters: ['Adrian'],
    reason: 'Reading and connecting records remain at the same casework workstation.',
  },
  {
    screenId: 'opening.helix.review',
    node: 'helix.review',
    visualMode: 'CUT',
    resolvedShotId: 'opening.helix.shot03-review',
    activeCharacters: ['Adrian'],
    reason: 'The authored work mode changes from analysis to final review.',
  },
  {
    screenId: 'opening.helix.submitted',
    node: 'helix.submitted',
    visualMode: 'CUT',
    resolvedShotId: 'opening.helix.shot04-submitted',
    activeCharacters: ['Adrian'],
    reason: 'Submission is a completed authored action with a new report state.',
  },
  {
    screenId: 'opening.maya.promotion',
    node: 'maya.promotion',
    visualMode: 'CUT',
    resolvedShotId: 'opening.maya.shot01-coffee',
    activeCharacters: ['Adrian', 'Maya'],
    reason: 'Maya enters carrying two cups and becomes an active participant.',
  },
  {
    screenId: 'opening.maya.invitation',
    node: 'maya.invitation',
    visualMode: 'HOLD',
    resolvedShotId: 'opening.maya.shot01-coffee',
    holdSource: 'opening.maya.shot01-coffee',
    activeCharacters: ['Adrian', 'Maya'],
    reason: 'Maya’s invitation continues with both cups and positions unchanged.',
  },
  {
    screenId: 'opening.maya.case',
    node: 'maya.case',
    visualMode: 'HOLD',
    resolvedShotId: 'opening.maya.shot01-coffee',
    holdSource: 'opening.maya.shot01-coffee',
    activeCharacters: ['Adrian', 'Maya'],
    reason: 'Maya’s case question continues at the same desk staging.',
  },
  {
    screenId: 'opening.maya.goodbye',
    node: 'maya.goodbye',
    visualMode: 'CUT',
    resolvedShotId: 'opening.maya.shot02-departure',
    activeCharacters: ['Adrian', 'Maya'],
    reason: 'Maya lifts her coffee and departs toward compliance.',
  },
  {
    screenId: 'opening.ending.complete',
    node: 'ending.complete',
    visualMode: 'CUT',
    resolvedShotId: 'opening.office.shot04-alone',
    activeCharacters: ['Adrian'],
    reason: 'The active participant set changes to Adrian alone after Maya leaves.',
  },
] as const;

type OpeningVisualStatus = OpeningCinematicStatus;

export type OpeningVisualOccupancy = {
  screenId: string;
  node: NodeId;
  readingBeat: string;
  visibleTextEvent: string;
  visualMode: OpeningVisualMode;
  resolvedVisualMode: OpeningVisualMode;
  resolvedShotId: string;
  holdSource?: string;
  activeCharacters: readonly string[];
  artStatus: OpeningVisualStatus;
  requiredAssetStatus: OpeningVisualStatus;
  runtimeStatus: OpeningVisualStatus;
  artAssetId?: string;
  artVisible: boolean;
  reason: string;
};

export type OpeningVisualOccupancyReport = {
  screens: readonly OpeningVisualOccupancy[];
  totalPlayableScreens: number;
  totalReachableScreens: number;
  screensWithRuntimeVisibleArt: number;
  artVisible: number;
  screensCurrentlyBlank: number;
  blank: number;
  uniqueRequiredCuts: number;
  holdCoveredScreens: number;
  complete: boolean;
  blankScreens: readonly OpeningVisualOccupancy[];
};

const approvedAssetIds = new Set(production.map((asset) => asset.id));
const coverageByShot = new Map(
  openingCinematicCoverageReport().cuts.map((cut) => [cut.shotId, cut.effectiveStatus]),
);

function statusForShot(shotId: string): OpeningVisualStatus {
  const binding = shotBindings[shotId];
  if (binding && approvedAssetIds.has(binding.assetId)) return 'RUNTIME_APPROVED';
  if (shotId.startsWith('opening.apartment.inspect-')) {
    const base = shotBindings['opening.apartment.shot01'];
    if (base && approvedAssetIds.has(base.assetId)) return 'RUNTIME_APPROVED';
  }
  return coverageByShot.get(shotId) ?? 'MISSING';
}

function specForNode(node: NodeId): OpeningVisualScreenSpec | undefined {
  return OPENING_VISUAL_SCREEN_SPECS.find((screen) => screen.node === node);
}

function occupancyFromSpec(spec: OpeningVisualScreenSpec): OpeningVisualOccupancy {
  const artStatus = statusForShot(spec.resolvedShotId);
  return {
    ...spec,
    readingBeat: spec.readingBeat ?? spec.screenId,
    visibleTextEvent: spec.visibleTextEvent ?? spec.reason,
    resolvedVisualMode: spec.visualMode,
    artStatus,
    requiredAssetStatus: artStatus,
    runtimeStatus: artStatus,
    artAssetId: shotBindings[spec.resolvedShotId]?.assetId,
    artVisible: artStatus === 'RUNTIME_APPROVED',
  };
}

/** Resolve the truthful CUT/HOLD state for the current playable opening screen. */
export function resolveOpeningVisualOccupancy(
  state: GameState,
  readingPosition = 0,
): OpeningVisualOccupancy | undefined {
  if (state.scene === 'apartment') {
    const node = nodeOf(state);
    if (node !== 'apartment.bond' && node !== 'apartment.reply' && node !== 'apartment.departure')
      return;
    const action = state.ledger[state.ledger.length - 1]?.action;
    if (
      node !== 'apartment.departure' &&
      action?.type === 'INSPECT_APARTMENT'
    ) {
      const shotId = `opening.apartment.inspect-${action.id}`;
      const hasDedicatedInsert = !!shotBindings[shotId];
      const resolvedShotId = hasDedicatedInsert
        ? shotId
        : ['apartment.bond', 'apartment.reply'].includes(node)
          ? 'opening.apartment.shot01-mirror'
          : 'opening.apartment.shot01';
      const artStatus = statusForShot(shotId);
      const resolvedStatus = statusForShot(resolvedShotId);
      return {
        screenId: `${node}.inspect-${action.id}`,
        node,
        readingBeat: 'apartment inspection',
        visibleTextEvent: `Player inspects ${action.id}.`,
        visualMode: hasDedicatedInsert ? 'CUT' : 'HOLD',
        resolvedVisualMode: hasDedicatedInsert ? 'CUT' : 'HOLD',
        resolvedShotId,
        holdSource: hasDedicatedInsert
          ? undefined
          : ['apartment.bond', 'apartment.reply'].includes(node)
            ? 'opening.apartment.shot01-mirror'
            : 'opening.apartment.shot01',
        activeCharacters: ['Adrian'],
        artStatus: hasDedicatedInsert ? artStatus : resolvedStatus,
        requiredAssetStatus: hasDedicatedInsert ? artStatus : resolvedStatus,
        runtimeStatus: hasDedicatedInsert ? artStatus : resolvedStatus,
        artAssetId: shotBindings[resolvedShotId]?.assetId,
        artVisible: (hasDedicatedInsert ? artStatus : resolvedStatus) === 'RUNTIME_APPROVED',
        reason: hasDedicatedInsert
          ? 'The inspection changes focus to a distinct evidence object.'
          : 'No inspection-specific art is approved; hold the truthful apartment master.',
      };
    }
    const spec = specForNode(node);
    return spec ? occupancyFromSpec(spec) : undefined;
  }

  if (state.scene === 'commute' && state.phase === 'arrival') {
    const reading = openingReadingBeats(state);
    const beat = reading?.beats[readingPosition];
    if (!beat) return;
    const spec = OPENING_VISUAL_SCREEN_SPECS.find(
      (screen) => screen.resolvedShotId === beat.shotId,
    );
    if (!spec) return;
    return occupancyFromSpec(spec);
  }

  const spec = specForNode(nodeOf(state));
  return spec ? occupancyFromSpec(spec) : undefined;
}

/**
 * Development/release report for the canonical opening corridor. A blank is
 * truthful when the required shot is missing, staging or component-only; it
 * is never converted into an invented fallback image.
 */
export function openingVisualOccupancyReport(): OpeningVisualOccupancyReport {
  const screens = OPENING_VISUAL_SCREEN_SPECS.map(occupancyFromSpec);
  const blankScreens = screens.filter((screen) => !screen.artVisible);
  const uniqueRequiredCuts = new Set(OPENING_CINEMATIC_CUTS.map((cut) => cut.shotId)).size;
  const holdCoveredScreens = screens.filter((screen) => screen.visualMode === 'HOLD').length;
  return {
    screens,
    totalPlayableScreens: screens.length,
    totalReachableScreens: screens.length,
    screensWithRuntimeVisibleArt: screens.length - blankScreens.length,
    artVisible: screens.length - blankScreens.length,
    screensCurrentlyBlank: blankScreens.length,
    blank: blankScreens.length,
    uniqueRequiredCuts,
    holdCoveredScreens,
    complete: blankScreens.length === 0,
    blankScreens,
  };
}

export function formatOpeningVisualOccupancyReport(
  report = openingVisualOccupancyReport(),
) {
  const lines = [
    'OPENING VISUAL OCCUPANCY',
    `total playable screens: ${report.totalPlayableScreens}`,
    `total reachable screens/states: ${report.totalReachableScreens}`,
    `screens with runtime-visible art: ${report.screensWithRuntimeVisibleArt}`,
    `currently art-visible: ${report.artVisible}`,
    `screens currently blank: ${report.screensCurrentlyBlank}`,
    `currently blank: ${report.blank}`,
    `unique required cuts: ${report.uniqueRequiredCuts}`,
    `HOLD-covered screens: ${report.holdCoveredScreens}`,
    `status: ${report.complete ? 'COMPLETE' : 'INCOMPLETE'}`,
    'blank screens:',
    ...(report.blankScreens.length
      ? report.blankScreens.map(
          (screen) =>
            `- ${screen.node} / ${screen.readingBeat} -> requires ${screen.resolvedShotId} [${screen.visualMode}] ${screen.visibleTextEvent}`,
        )
      : ['- none']),
  ];
  return lines.join('\n');
}

export function isOpeningVisualStatus(value: string): value is OpeningCinematicStatus {
  return (OPENING_CINEMATIC_STATUSES as readonly string[]).includes(value);
}
