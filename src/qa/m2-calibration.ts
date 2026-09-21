import { z } from 'zod';
import { M2FindingClassificationSchema, M2HumanDispositionSchema, M2RouteAuthoritySchema, type M2FindingClassification, routeAuthorityForRevision } from './m2';

/** Human disposition answers what happens after classification; it is separate from reviewer correctness. */
export const M2CalibrationDispositionSchema = M2HumanDispositionSchema;
export type M2CalibrationDisposition = z.infer<typeof M2CalibrationDispositionSchema>;

const CalibrationEvidenceSchema = z
  .object({
    type: z.string().min(1).max(80),
    reference: z.string().min(1).max(500),
    excerpt: z.string().max(2000).optional(),
  })
  .strict();

export const M2CalibrationRecordSchema = z
  .object({
    id: z.enum(['calibration-1', 'calibration-2', 'calibration-3', 'calibration-4']),
    routeId: z.string().min(1).max(160),
    reviewer: z.string().min(1).max(80),
    reviewerVersion: z.string().regex(/^v\d+$/),
    classification: M2FindingClassificationSchema,
    cause: z.string().min(1).max(120),
    disposition: M2CalibrationDispositionSchema,
    actionableCurrentBug: z.boolean(),
    actionableAtReview: z.boolean(),
    legacyIssue: z.boolean(),
    historicalContentMutable: z.boolean(),
    currentAuthoringFixExists: z.boolean(),
    contentRevision: z.number().int().nonnegative(),
    authority: M2RouteAuthoritySchema,
    transcriptDigest: z.string().regex(/^[a-f0-9]{64}$/).optional(),
    contextDigest: z.string().regex(/^[a-f0-9]{64}$/).optional(),
    finding: z.string().min(1).max(5000),
    evidence: z.array(CalibrationEvidenceSchema).min(1).max(20),
    noRetroactiveFixReason: z.string().min(1).max(2000),
    currentAuthoringResolution: z.string().min(1).max(2000).optional(),
  })
  .strict();
export type M2CalibrationRecord = z.infer<typeof M2CalibrationRecordSchema>;

const frozenTranscriptDigest = '3b142bdb19dc2d3be7b17768b357cc078019f937fd5611a3da2c00cb37547931';
const frozenContextDigest = '068a0bfe66317bccf0b8c78b0c048b3fd356424a04bab19cae6a9eb3c35ad991';

/** The four reviewed opening LOGIC records. This registry is human-authored metadata, not auto-classification. */
export const M2_OPENING_LOGIC_CALIBRATION: readonly M2CalibrationRecord[] = [
  {
    id: 'calibration-1',
    routeId: 'opening-bad-assessment',
    reviewer: 'LOGIC',
    reviewerVersion: 'v1',
    classification: 'FALSE_POSITIVE',
    cause: 'MISSING_TRANSITION_CONTEXT',
    disposition: 'RESOLVED_CURRENT',
    actionableCurrentBug: false,
    actionableAtReview: false,
    legacyIssue: false,
    historicalContentMutable: true,
    currentAuthoringFixExists: true,
    contentRevision: 17,
    authority: routeAuthorityForRevision(17),
    finding: 'The transition appeared to attribute the player response to the wrong speaker.',
    evidence: [{ type: 'transcript', reference: 'opening-bad-assessment:transition-complete transcript' }],
    noRetroactiveFixReason: 'The apparent contradiction was caused by an incomplete transcript projection and is corrected in the QA context builder.',
    currentAuthoringResolution: 'Transition-complete transcripts retain every emitted history record in order.',
  },
  {
    id: 'calibration-2',
    routeId: 'opening-bad-assessment',
    reviewer: 'LOGIC',
    reviewerVersion: 'v1',
    classification: 'USEFUL_WARNING',
    cause: 'ACTION_SEMANTICS_AMBIGUITY',
    disposition: 'RESOLVED_CURRENT',
    actionableCurrentBug: false,
    actionableAtReview: false,
    legacyIssue: false,
    historicalContentMutable: true,
    currentAuthoringFixExists: true,
    contentRevision: 17,
    authority: routeAuthorityForRevision(17),
    finding: 'The wording could imply that analytical evidence selection controls report attachment.',
    evidence: [{ type: 'runtime', reference: 'opening-bad-assessment:TOGGLE_EVIDENCE versus SUBMIT_ASSESSMENT semantics' }],
    noRetroactiveFixReason: 'The reducer intentionally keeps analysis selection separate from the all-reviewed-records submission behavior.',
    currentAuthoringResolution: 'Current authoring copy names reviewed records and recorded connections explicitly.',
  },
  {
    id: 'calibration-3',
    routeId: 'opening-bad-assessment',
    reviewer: 'LOGIC',
    reviewerVersion: 'v1',
    classification: 'TRUE_ISSUE',
    cause: 'COPY_MECHANICS_MISMATCH',
    disposition: 'RESOLVED_CURRENT',
    actionableCurrentBug: false,
    actionableAtReview: true,
    legacyIssue: false,
    historicalContentMutable: true,
    currentAuthoringFixExists: true,
    contentRevision: 17,
    authority: routeAuthorityForRevision(17),
    finding: 'The prior authoring copy overstated manual attachment agency during assessment submission.',
    evidence: [{ type: 'runtime', reference: 'opening-bad-assessment:SUBMIT_ASSESSMENT copies reviewed documents and recorded connections' }],
    noRetroactiveFixReason: 'The issue was fixed in current authoring without adding a new reducer action or save field.',
    currentAuthoringResolution: 'Current copy says “the records you reviewed and the connections you recorded.”',
  },
  {
    id: 'calibration-4',
    routeId: 'opening-bad-assessment',
    reviewer: 'LOGIC',
    reviewerVersion: 'v1',
    classification: 'TRUE_ISSUE',
    cause: 'COPY_MECHANICS_MISMATCH',
    disposition: 'KNOWN_FROZEN_HISTORICAL',
    actionableCurrentBug: false,
    actionableAtReview: false,
    legacyIssue: true,
    historicalContentMutable: false,
    currentAuthoringFixExists: true,
    contentRevision: 16,
    authority: routeAuthorityForRevision(16),
    transcriptDigest: frozenTranscriptDigest,
    contextDigest: frozenContextDigest,
    finding: 'The frozen submitted-scene wording implies that the player chose which records and connections to attach.',
    evidence: [
      { type: 'transcript', reference: 'opening-bad-assessment:authenticated revision-16 transcript', excerpt: 'The report leaves your terminal addressed to Benton only. Your selected conclusion remains in it, with the records and connections you chose to attach.' },
      { type: 'digest', reference: `transcriptDigest:${frozenTranscriptDigest}` },
      { type: 'digest', reference: `contextDigest:${frozenContextDigest}` },
    ],
    noRetroactiveFixReason: 'Revision-16 authenticated history is immutable; changing it would break frozen replay and authentication.',
    currentAuthoringResolution: 'Revision-17 authoring uses “the records you reviewed and the connections you recorded.”',
  },
];

export const M2_OPENING_LOGIC_CALIBRATION_STATUS = 'COMPLETE' as const;

export type M2CalibrationClassificationMetrics = {
  reviewedFindings: number;
  trueIssues: number;
  usefulWarnings: number;
  falsePositives: number;
  insufficientEvidence: number;
};

export function summarizeCalibrationClassifications(records: readonly M2CalibrationRecord[] = M2_OPENING_LOGIC_CALIBRATION): M2CalibrationClassificationMetrics {
  const metrics: M2CalibrationClassificationMetrics = {
    reviewedFindings: 0,
    trueIssues: 0,
    usefulWarnings: 0,
    falsePositives: 0,
    insufficientEvidence: 0,
  };
  for (const record of records) {
    const parsed = M2CalibrationRecordSchema.parse(record);
    metrics.reviewedFindings += 1;
    if (parsed.classification === 'TRUE_ISSUE') metrics.trueIssues += 1;
    if (parsed.classification === 'USEFUL_WARNING') metrics.usefulWarnings += 1;
    if (parsed.classification === 'FALSE_POSITIVE') metrics.falsePositives += 1;
    if (parsed.classification === 'INSUFFICIENT_EVIDENCE') metrics.insufficientEvidence += 1;
  }
  return metrics;
}

export function summarizeCalibrationDispositions(records: readonly M2CalibrationRecord[] = M2_OPENING_LOGIC_CALIBRATION): Record<M2CalibrationDisposition, number> {
  const metrics = {
    ACTIONABLE_CURRENT: 0,
    KNOWN_FROZEN_HISTORICAL: 0,
    ACCEPTED_DESIGN_DEBT: 0,
    RESOLVED_CURRENT: 0,
    NEEDS_DECISION: 0,
  } satisfies Record<M2CalibrationDisposition, number>;
  for (const record of records) metrics[M2CalibrationRecordSchema.parse(record).disposition] += 1;
  return metrics;
}

/** No finding is auto-matched to this registry; each disposition requires an explicit human record. */
export function isKnownFrozenHistoricalCalibration(recordId: string): boolean {
  return recordId === 'calibration-4';
}

export type M2RemainingPilotSelection = {
  ordinal: number;
  routeId: 'opening-bad-assessment' | 'chapter5-no-intimacy' | 'chapter5-public-visibility';
  reviewer: 'CONTINUITY' | 'KNOWLEDGE' | 'INVESTIGATION' | 'AGENCY_POWER' | 'ADULT_THRILLER' | 'ROUTE_COHESION';
};

/** The nine original calls still to be selected; this does not execute a provider. */
export const M2_REMAINING_PILOT_SELECTION: readonly M2RemainingPilotSelection[] = [
  { ordinal: 2, routeId: 'opening-bad-assessment', reviewer: 'KNOWLEDGE' },
  { ordinal: 3, routeId: 'opening-bad-assessment', reviewer: 'INVESTIGATION' },
  { ordinal: 4, routeId: 'chapter5-no-intimacy', reviewer: 'CONTINUITY' },
  { ordinal: 5, routeId: 'chapter5-no-intimacy', reviewer: 'AGENCY_POWER' },
  { ordinal: 6, routeId: 'chapter5-no-intimacy', reviewer: 'ADULT_THRILLER' },
  { ordinal: 7, routeId: 'chapter5-no-intimacy', reviewer: 'ROUTE_COHESION' },
  { ordinal: 8, routeId: 'chapter5-public-visibility', reviewer: 'CONTINUITY' },
  { ordinal: 9, routeId: 'chapter5-public-visibility', reviewer: 'ADULT_THRILLER' },
  { ordinal: 10, routeId: 'chapter5-public-visibility', reviewer: 'ROUTE_COHESION' },
];

export function validateCalibrationRegistry() {
  return M2_OPENING_LOGIC_CALIBRATION.map((record) => M2CalibrationRecordSchema.parse(record));
}

export type { M2FindingClassification };
