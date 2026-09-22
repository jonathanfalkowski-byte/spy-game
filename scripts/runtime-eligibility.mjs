// Offline production-record boundary. This module is deliberately not imported by runtime UI code.
export const runtimeEligibilityValues = [
  'runtime-approved',
  'component-only',
  'not-runtime',
];

export function assertValidRuntimeEligibility(record) {
  if (record.role !== 'production') {
    if (record.runtimeEligibility !== undefined)
      throw Error('Only production records may declare runtime eligibility');
    return;
  }

  if (!runtimeEligibilityValues.includes(record.runtimeEligibility))
    throw Error(`Production record requires valid runtime eligibility: ${record.spec?.assetId ?? 'unknown'}`);

  if (record.runtimeEligibility === 'not-runtime') return;

  if (
    record.approvalStatus !== 'approved' ||
    !record.approval ||
    !record.file ||
    !record.sha256 ||
    record.review?.decision !== 'PASS'
  )
    throw Error(
      `${record.runtimeEligibility} production record requires approval, PASS review, file and hash: ${record.spec?.assetId ?? 'unknown'}`,
    );
}

export function isRuntimeApprovedProductionRecord(record) {
  assertValidRuntimeEligibility(record);
  return record.role === 'production' && record.runtimeEligibility === 'runtime-approved';
}
