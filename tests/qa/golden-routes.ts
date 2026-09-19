import type { GameState } from '../../src/state/schema';
import { finish, toMaya } from '../helpers';
import { clinicStart, traverse } from '../clinic-helpers';
import { missionStart, runMission } from '../mission-helpers';
import { scene2 } from '../chapter3-evening-helpers';
import { assignment, departure } from '../chapter4-helpers';
import { dress5, end4 } from '../chapter5-helpers';
import type { ReconvergenceContract } from '../../src/qa/m1';

export type GoldenCheckpoint = { id: string; node: string };
const checkpointSet = (nodes: string[]): GoldenCheckpoint[] => nodes.map((node) => ({ id: node, node }));

export type GoldenRoute = {
  id: string;
  description: string;
  startingRevision: number;
  expectedCheckpoints: string[];
  checkpoints?: GoldenCheckpoint[];
  expectedTerminal?: boolean;
  expectedPersistentFacts?: (state: GameState) => boolean;
  factory: () => GameState;
};

/**
 * These factories deliberately reuse the existing route helpers. They express
 * route intent without duplicating runtime eligibility or maintaining a second
 * choice graph.
 */
export const goldenRoutes: GoldenRoute[] = [
  {
    id: 'opening-analytical-cautious',
    description: 'Bounded evidence and a cautious opening assessment.',
    startingRevision: 13,
    expectedCheckpoints: ['helix.submitted', 'ending.complete'],
    checkpoints: checkpointSet(['helix.submitted', 'ending.complete']),
    expectedPersistentFacts: (state) => state.report?.quality === 'supported',
    factory: () => finish(toMaya({ bond: 'friend', morning: 'yes', assessment: 'bounded', search: 'patents' })),
  },
  {
    id: 'opening-bad-assessment',
    description: 'A deliberately mistaken assessment with persisted credibility consequence.',
    startingRevision: 13,
    expectedCheckpoints: ['helix.submitted', 'ending.complete'],
    checkpoints: checkpointSet(['helix.submitted', 'ending.complete']),
    expectedPersistentFacts: (state) => state.report?.quality === 'incorrect',
    factory: () => finish(toMaya({ bond: 'love', morning: 'work', assessment: 'fraud' })),
  },
  {
    id: 'clinic-privacy-autonomy',
    description: 'Privacy-forward clinic path that reaches the existing presentation endpoint.',
    startingRevision: 13,
    expectedCheckpoints: ['clinic.privacy', 'clinic.complete'],
    checkpoints: checkpointSet(['clinic.privacy', 'clinic.complete']),
    expectedPersistentFacts: (state) => state.clinic.privacy === 'demand' || state.clinic.privacy === 'ask',
    factory: () => traverse(clinicStart(), { privacy: 'privacy.demand', privacyReply: 'c.privacyReply' }),
  },
  {
    id: 'mission-cautious-investigation',
    description: 'Executive presentation with a cautious mission debrief.',
    startingRevision: 13,
    expectedCheckpoints: ['mission.complete'],
    checkpoints: checkpointSet(['mission.complete']),
    expectedPersistentFacts: (state) => state.mission.outcome === 'complete',
    factory: () => runMission(missionStart('executive'), { debrief: 'debrief.risk' }),
  },
  {
    id: 'chapter3-home-contact',
    description: 'Chapter 3 follow-up with retained home context.',
    startingRevision: 13,
    expectedCheckpoints: ['chapter3.mayaContact'],
    checkpoints: checkpointSet(['chapter3.mayaContact']),
    expectedPersistentFacts: (state) => state.mission.completed.includes('home.begin'),
    factory: () => scene2('access', { home: true }),
  },
  {
    id: 'chapter4-julian-professional',
    description: 'Julian destination with professional, bounded treatment.',
    startingRevision: 15,
    expectedCheckpoints: ['chapter4.assignment'],
    checkpoints: checkpointSet(['chapter4.assignment']),
    expectedPersistentFacts: (state) => state.choices['c3.departure'] === 'julian-mercer' && state.choices['c4.opening'] === 'julian-mercer',
    factory: () => assignment(departure('julian-mercer')),
  },
  {
    id: 'chapter4-independent-public',
    description: 'Independent/public Chapter 4 departure path.',
    startingRevision: 15,
    expectedCheckpoints: ['chapter4.complete'],
    checkpoints: checkpointSet(['chapter4.complete']),
    expectedPersistentFacts: (state) => state.choices['c3.departure'] === 'own' && state.choices['c4.opening'] === 'own',
    factory: () => end4('public'),
  },
  {
    id: 'chapter5-public-visibility',
    description: 'Chapter 5 public-facing route entering the invitation beat.',
    startingRevision: 16,
    expectedCheckpoints: ['chapter5.invitation'],
    checkpoints: checkpointSet(['chapter5.invitation']),
    expectedPersistentFacts: (state) => state.contentRevision === 17 || state.contentRevision === 16,
    factory: () => dress5(end4('public')),
  },
  {
    id: 'chapter5-no-intimacy',
    description: 'Chapter 5 professional route without an intimacy handoff.',
    startingRevision: 16,
    expectedCheckpoints: ['chapter5.invitation'],
    checkpoints: checkpointSet(['chapter5.invitation']),
    expectedPersistentFacts: (state) => state.contentRevision === 17 || state.contentRevision === 16,
    factory: () => dress5(end4('professional')),
  },
  {
    id: 'chapter5-eligible-intimacy',
    description: 'Existing non-graphic eligible-intimacy state route.',
    startingRevision: 16,
    expectedCheckpoints: ['chapter5.invitation'],
    checkpoints: checkpointSet(['chapter5.invitation']),
    expectedPersistentFacts: (state) => state.contentRevision === 17 || state.contentRevision === 16,
    factory: () => dress5(end4('intimacy')),
  },
];

export const reconvergenceContracts: ReconvergenceContract[] = [
  {
    id: 'opening-assessment-reconvergence',
    node: 'ending.complete',
    routeIds: ['opening-analytical-cautious', 'opening-bad-assessment'],
    mustAgree: ['scene', 'phase'],
    mustDiffer: ['relationships.bond', 'report.quality'],
  },
  {
    id: 'chapter5-invitation-history-reconvergence',
    node: 'chapter5.presentation',
    routeIds: ['chapter5-public-visibility', 'chapter5-no-intimacy', 'chapter5-eligible-intimacy'],
    mustAgree: ['scene', 'phase'],
    mustDiffer: ['choices.c3.departure'],
  },
];
