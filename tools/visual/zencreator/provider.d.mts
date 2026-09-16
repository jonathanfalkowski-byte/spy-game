import type { VisualAssetSpec, VisualAssetRecord } from '../../../src/visual/schema';
export const provider: 'zencreator';
export const promptVersion: 'eve-evelynn-v1';
export type Request = {
  components: Record<string, string>;
  settings: Record<string, string | number | boolean>;
  inputs: { image_assets: string[]; prompt: string; model: string; [key: string]: unknown };
};
export function buildRequest(spec: VisualAssetSpec, referenceAssetId: string): Request;
export function stageCandidate(
  spec: VisualAssetSpec,
  request: Request,
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
