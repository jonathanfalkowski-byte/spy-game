export type RuntimeEligibilityRecord = {
  role?: unknown;
  runtimeEligibility?: unknown;
  approvalStatus?: unknown;
  approval?: unknown;
  file?: unknown;
  sha256?: unknown;
  review?: { decision?: unknown };
  spec?: { assetId?: unknown };
};

export const runtimeEligibilityValues: readonly [
  'runtime-approved',
  'component-only',
  'not-runtime',
];
export function assertValidRuntimeEligibility(record: RuntimeEligibilityRecord): void;
export function isRuntimeApprovedProductionRecord(record: RuntimeEligibilityRecord): boolean;
