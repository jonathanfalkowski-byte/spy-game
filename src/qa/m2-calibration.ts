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

export const M2PilotIssueFamilySchema = z.enum([
  'MAYA_BENTON_KNOWLEDGE',
  'BENTON_READ_SEMANTICS',
  'ATTACHMENT_COPY_MECHANICS',
  'EVELYN_DISPLAY_NAME',
  'CHAPTER5_NEXT_DAY_CONTEXT',
]);
export type M2PilotIssueFamily = z.infer<typeof M2PilotIssueFamilySchema>;

const M2PilotRawFindingSchema = z
  .object({
    id: z.string().min(1).max(120),
    routeId: z.string().min(1).max(160),
    reviewer: z.string().min(1).max(80),
    reviewerVersion: z.string().regex(/^v\d+$/),
    findingIndex: z.number().int().positive(),
    issueFamilyId: M2PilotIssueFamilySchema,
    classification: M2FindingClassificationSchema,
    disposition: M2CalibrationDispositionSchema.optional(),
    cause: z.string().min(1).max(160),
    contentRevision: z.number().int().nonnegative(),
    authority: M2RouteAuthoritySchema,
    transcriptDigest: z.string().regex(/^[a-f0-9]{64}$/),
    contextDigest: z.string().regex(/^[a-f0-9]{64}$/),
    finding: z.string().min(1).max(5000),
    rawResultReference: z.string().min(1).max(300),
    deduplicatesAgainst: z.string().min(1).max(120).optional(),
    noRetroactiveFixReason: z.string().min(1).max(2000),
    currentRuntimeResolution: z.string().min(1).max(2000).optional(),
  })
  .strict();
export type M2PilotRawFinding = z.infer<typeof M2PilotRawFindingSchema>;

const pilotFrozenAuthority = routeAuthorityForRevision(16);
const openingPilotFrozenAuthority = routeAuthorityForRevision(13);
const openingTranscriptDigest = '3b142bdb19dc2d3be7b17768b357cc078019f937fd5611a3da2c00cb37547931';
const openingContextDigest = 'c42800f4fc88e62062d3af5c56026d01562d7d03a93bd5dbb50488b24fa05d5a';
const noIntimacyTranscriptDigest = '1a780ad211900678fe7adaff7beb312e8795c9e01e88a036d7bf5da2a6d36a48';
const noIntimacyContextDigest = 'ace9397547f6fb2b9f7d0880d17ed2379bb03db23af5b901a68699b330030e02';
const publicTranscriptDigest = '649f100542a759746484962e65244e495dac86933d354e05b9195a6e694bc702';
const publicContextDigest = '18c7475171422842b9e436e3e57c14f8cd1d91e2741780d353c4c0dad11e79de';

/** Nine provider findings recorded exactly once; issueFamilyId converges duplicate reviewer observations. */
export const M2_REMAINING_PILOT_CLASSIFICATIONS: readonly M2PilotRawFinding[] = [
  {
    id: 'pilot-a-knowledge-maya', routeId: 'opening-bad-assessment', reviewer: 'KNOWLEDGE', reviewerVersion: 'v1', findingIndex: 1,
    issueFamilyId: 'MAYA_BENTON_KNOWLEDGE', classification: 'TRUE_ISSUE', disposition: 'ACTIONABLE_CURRENT', cause: 'NPC_KNOWLEDGE_RECORDED_AS_FACT_INSTEAD_OF_INFERENCE',
    contentRevision: 13, authority: openingPilotFrozenAuthority, transcriptDigest: openingTranscriptDigest, contextDigest: openingContextDigest,
    finding: 'Maya identifies Benton as directing the Helix-Novagen review even though the visible report header exposes only the company names; runtime records helix_assignment as known rather than inferred or believed.',
    rawResultReference: 'qa/reports/m2-1-pilot-latest.json#results[0].result.findings[0]',
    noRetroactiveFixReason: 'The reviewed route is authenticated revision 13. Frozen replay remains immutable; any current-runtime correction must be proven independent of historical replay.',
    currentRuntimeResolution: 'Dependency audit found no current gameplay read of maya.known.helix_assignment; current authoring may represent this observation as a sourced belief.',
  },
  {
    id: 'pilot-b-knowledge-benton-read', routeId: 'opening-bad-assessment', reviewer: 'KNOWLEDGE', reviewerVersion: 'v1', findingIndex: 2,
    issueFamilyId: 'BENTON_READ_SEMANTICS', classification: 'TRUE_ISSUE', disposition: 'NEEDS_DECISION', cause: 'RECEIPT_VS_READING_SEMANTICS',
    contentRevision: 13, authority: openingPilotFrozenAuthority, transcriptDigest: openingTranscriptDigest, contextDigest: openingContextDigest,
    finding: 'Submission adds read_email, read_finance, read_news, and read_intel although the transition proves receipt or attachment, not that Benton read the records.',
    rawResultReference: 'qa/reports/m2-1-pilot-latest.json#results[0].result.findings[1]',
    noRetroactiveFixReason: 'Do not rename historical keys or change frozen recipient state before the semantic model is chosen.',
  },
  {
    id: 'pilot-c-investigation-attachment-copy', routeId: 'opening-bad-assessment', reviewer: 'INVESTIGATION', reviewerVersion: 'v1', findingIndex: 1,
    issueFamilyId: 'ATTACHMENT_COPY_MECHANICS', classification: 'TRUE_ISSUE', disposition: 'KNOWN_FROZEN_HISTORICAL', cause: 'COPY_MECHANICS_MISMATCH',
    contentRevision: 13, authority: openingPilotFrozenAuthority, transcriptDigest: openingTranscriptDigest, contextDigest: openingContextDigest,
    finding: 'Submission narration presents report attachments as player-selected even though the runtime copies all reviewed documents and recorded connections; there is no per-document attachment action.',
    rawResultReference: 'qa/reports/m2-1-pilot-latest.json#results[1].result.findings[0]',
    deduplicatesAgainst: 'calibration-4',
    noRetroactiveFixReason: 'This is the already-known frozen attachment wording issue. Revision-17 copy is corrected; no second issue record or retroactive replay edit is created.',
    currentRuntimeResolution: 'Current authoring says “the records you reviewed and the connections you recorded.”',
  },
  {
    id: 'pilot-d-continuity-name', routeId: 'chapter5-no-intimacy', reviewer: 'CONTINUITY', reviewerVersion: 'v1', findingIndex: 1,
    issueFamilyId: 'EVELYN_DISPLAY_NAME', classification: 'TRUE_ISSUE', disposition: 'NEEDS_DECISION', cause: 'LEGACY_DISPLAY_NAME_VS_CANONICAL_DISPLAY_NAME',
    contentRevision: 16, authority: pilotFrozenAuthority, transcriptDigest: noIntimacyTranscriptDigest, contextDigest: noIntimacyContextDigest,
    finding: 'The operational identity changes from Evelyn Vale to Evelynn Vale without an in-story amendment or corrected credential.',
    rawResultReference: 'qa/reports/m2-1-pilot-latest.json#results[3].result.findings[0]',
    noRetroactiveFixReason: 'Authenticated revision-16 prose and external identity records are immutable pending an owner decision on display compatibility.',
  },
  {
    id: 'pilot-e-continuity-next-day', routeId: 'chapter5-no-intimacy', reviewer: 'CONTINUITY', reviewerVersion: 'v1', findingIndex: 2,
    issueFamilyId: 'CHAPTER5_NEXT_DAY_CONTEXT', classification: 'FALSE_POSITIVE', cause: 'MISSING_SCENE_PLACE_METADATA',
    contentRevision: 16, authority: pilotFrozenAuthority, transcriptDigest: noIntimacyTranscriptDigest, contextDigest: noIntimacyContextDigest,
    finding: 'The transition appears to omit the overnight change between an invitation for tomorrow and presentation preparation.',
    rawResultReference: 'qa/reports/m2-1-pilot-latest.json#results[3].result.findings[1]',
    noRetroactiveFixReason: 'The authenticated scene metadata already says “The following day · Apartment”; the reviewer lacked that context.',
  },
  {
    id: 'pilot-f-route-name', routeId: 'chapter5-no-intimacy', reviewer: 'ROUTE_COHESION', reviewerVersion: 'v1', findingIndex: 1,
    issueFamilyId: 'EVELYN_DISPLAY_NAME', classification: 'TRUE_ISSUE', disposition: 'NEEDS_DECISION', cause: 'LEGACY_DISPLAY_NAME_VS_CANONICAL_DISPLAY_NAME',
    contentRevision: 16, authority: pilotFrozenAuthority, transcriptDigest: noIntimacyTranscriptDigest, contextDigest: noIntimacyContextDigest,
    finding: 'The established cover identity changes from Evelyn Vale to Evelynn Vale without a renaming event, then persists through Chapters 3–5 and external records.',
    rawResultReference: 'qa/reports/m2-1-pilot-latest.json#results[5].result.findings[0]',
    noRetroactiveFixReason: 'This duplicates the identity-family issue already recorded for the route; frozen prose remains untouched pending owner decision.',
  },
  {
    id: 'pilot-g-route-next-day', routeId: 'chapter5-no-intimacy', reviewer: 'ROUTE_COHESION', reviewerVersion: 'v1', findingIndex: 2,
    issueFamilyId: 'CHAPTER5_NEXT_DAY_CONTEXT', classification: 'FALSE_POSITIVE', cause: 'MISSING_SCENE_PLACE_METADATA',
    contentRevision: 16, authority: pilotFrozenAuthority, transcriptDigest: noIntimacyTranscriptDigest, contextDigest: noIntimacyContextDigest,
    finding: 'The invitation says tomorrow but the next transition enters presentation preparation without an explicit overnight narration.',
    rawResultReference: 'qa/reports/m2-1-pilot-latest.json#results[5].result.findings[1]',
    noRetroactiveFixReason: 'The authenticated presentation place metadata establishes the following day; no Chapter 5 prose change is warranted.',
  },
  {
    id: 'pilot-h-public-name', routeId: 'chapter5-public-visibility', reviewer: 'CONTINUITY', reviewerVersion: 'v1', findingIndex: 1,
    issueFamilyId: 'EVELYN_DISPLAY_NAME', classification: 'TRUE_ISSUE', disposition: 'NEEDS_DECISION', cause: 'LEGACY_DISPLAY_NAME_VS_CANONICAL_DISPLAY_NAME',
    contentRevision: 16, authority: pilotFrozenAuthority, transcriptDigest: publicTranscriptDigest, contextDigest: publicContextDigest,
    finding: 'The established identity changes spelling from Evelyn Vale to Evelynn Vale without an explained identity amendment in the Harbour preview registration.',
    rawResultReference: 'qa/reports/m2-1-pilot-latest.json#results[6].result.findings[0]',
    noRetroactiveFixReason: 'This is the same display-name family as the two Chapter 5 no-intimacy findings; frozen identity prose remains immutable.',
  },
  {
    id: 'pilot-i-public-next-day', routeId: 'chapter5-public-visibility', reviewer: 'CONTINUITY', reviewerVersion: 'v1', findingIndex: 2,
    issueFamilyId: 'CHAPTER5_NEXT_DAY_CONTEXT', classification: 'FALSE_POSITIVE', cause: 'MISSING_SCENE_PLACE_METADATA',
    contentRevision: 16, authority: pilotFrozenAuthority, transcriptDigest: publicTranscriptDigest, contextDigest: publicContextDigest,
    finding: 'The transition appears to move from tomorrow’s preview to dressing by five without an explicit overnight transition.',
    rawResultReference: 'qa/reports/m2-1-pilot-latest.json#results[6].result.findings[1]',
    noRetroactiveFixReason: 'The authenticated presentation scene place already establishes “The following day · Apartment”; this is a context false positive.',
  },
];

export const M2_INCOMPLETE_PILOT_EXECUTIONS = [
  {
    routeId: 'chapter5-public-visibility',
    reviewer: 'ROUTE_COHESION',
    status: 'INCOMPLETE_RESPONSE' as const,
    reason: 'max_output_tokens',
    inputTokens: 57544,
    outputTokens: 3000,
    reasoningTokens: 1350,
    totalTokens: 60544,
    estimatedCostUsd: 0.290176,
    retried: false,
  },
] as const;

export function validateRemainingPilotClassifications() {
  return M2_REMAINING_PILOT_CLASSIFICATIONS.map((record) => M2PilotRawFindingSchema.parse(record));
}

export type M2PilotClassificationMetrics = M2CalibrationClassificationMetrics & {
  uniqueIssueFamilies: number;
  uniqueTrueIssueFamilies: number;
};

export function summarizeRemainingPilotClassifications(records: readonly M2PilotRawFinding[] = M2_REMAINING_PILOT_CLASSIFICATIONS): M2PilotClassificationMetrics {
  const parsed = records.map((record) => M2PilotRawFindingSchema.parse(record));
  const uniqueFamilies = new Map<M2PilotIssueFamily, M2FindingClassification>();
  for (const record of parsed) {
    const existing = uniqueFamilies.get(record.issueFamilyId);
    if (!existing || record.classification === 'TRUE_ISSUE') uniqueFamilies.set(record.issueFamilyId, record.classification);
  }
  return {
    reviewedFindings: parsed.length,
    trueIssues: parsed.filter((record) => record.classification === 'TRUE_ISSUE').length,
    usefulWarnings: parsed.filter((record) => record.classification === 'USEFUL_WARNING').length,
    falsePositives: parsed.filter((record) => record.classification === 'FALSE_POSITIVE').length,
    insufficientEvidence: parsed.filter((record) => record.classification === 'INSUFFICIENT_EVIDENCE').length,
    uniqueIssueFamilies: uniqueFamilies.size,
    uniqueTrueIssueFamilies: [...uniqueFamilies.values()].filter((classification) => classification === 'TRUE_ISSUE').length,
  };
}

export type { M2FindingClassification };
