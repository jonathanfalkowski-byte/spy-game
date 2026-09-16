import type { VisualAssetSpec, VisualAssetRecord } from '../../../src/visual/schema';
export type PackEntry = {
  key: string;
  kind: string;
  title: string;
  concept: boolean;
  sources: string[];
  sourceNodes: string[];
  guard: string;
  direction: string;
  spec: VisualAssetSpec;
  references: { assetId: string; purpose: string }[];
};
export type PackRequest = {
  toolName?: 'by_prompt';
  components: Record<string, string>;
  settings: Record<string, string | number | boolean>;
  sourceReferences: { assetId: string; providerAssetId: string }[];
  inputs: {
    image_assets?: string[];
    prompt?: string;
    positive_prompt?: string;
    model: string;
    [key: string]: unknown;
  };
};
export function buildTextCastRequest(entry: PackEntry): PackRequest;
export function buildPackRequest(
  entry: PackEntry,
  references: PackRequest['sourceReferences'],
): PackRequest;
export function stagePackCandidate(
  entry: PackEntry,
  request: PackRequest,
  receipt: {
    taskId: string;
    callId: string;
    providerAssetId: string;
    mediaType: string;
    sha256: string;
    createdAt: string;
    estimatedCredits: number;
    outputDimensions: { width: number; height: number };
  },
): VisualAssetRecord;
