// Offline adapter: no network, filesystem, credentials, approval or runtime imports.
import { z } from 'zod';

export const provider = 'zencreator';
export const promptVersion = 'eve-evelynn-v1';
export function buildRequest(spec, referenceAssetId) {
  z.uuid().parse(referenceAssetId);
  if (
    !/^evelynn-canon-(front|three-quarter|profile|fullbody)-v1$/.test(spec.assetId) ||
    spec.styleBibleVersion !== '1.0' ||
    spec.subjects?.length !== 1 ||
    spec.subjects[0].characterId !== 'player-character' ||
    spec.subjects[0].identityId !== 'evelyn' ||
    spec.canonicalReferences?.length !== 1 ||
    spec.canonicalReferences[0] !== 'evelynn-helix-gala-v1'
  )
    throw Error('Only the first four Evelynn specs are authorized');
  const full = spec.assetType === 'full-body';
  if (spec.dimensions?.width !== 1536 || spec.dimensions?.height !== (full ? 2304 : 2048))
    throw Error('Unexpected requested dimensions');
  const components = {
    EVE_STYLE:
      'Preserve the reference illustration: polished 2D adult espionage graphic novel, confident clean linework, semi-cel shading, strong graphic shadows, controlled highlights, subtle illustrated texture, believable adult anatomy.',
    EVELYNN_CANON:
      'Keep the same adult woman and her identity: angular facial shape, defined cheekbones, almond-shaped eyes, strong brows, elegant nose, full controlled lips, dark brunette near-black hair, hairline, skin tone, slim graceful proportions and poised silhouette. Preserve the elegant updo and loose face-framing strands for this consistency test.',
    REFERENCE_IMAGE:
      'The woman in the supplied approved Evelynn Helix gala illustration is the sole identity and style reference.',
    ASSET_TYPE: spec.assetType,
    POSE: spec.pose,
    CAMERA: spec.cameraAngle + '. ' + spec.cameraFraming,
    WARDROBE:
      'Retain the black evening gown and black gemstone earrings from the reference, with a simple elegant front neckline. Empty hands for the neutral study.',
    LIGHTING: spec.lighting,
    MOOD: spec.mood + '. Expression: ' + spec.expression,
    ENVIRONMENT: spec.environment,
  };
  const prompt =
    components.REFERENCE_IMAGE +
    ' Recompose her into the following single character reference study, changing the camera and pose as specified. Replace the gala setting with the quiet backdrop. ' +
    Object.entries(components)
      .filter(([key]) => key !== 'REFERENCE_IMAGE')
      .map(([key, value]) => key + ': ' + value)
      .join('\n') +
    '\nPreserve her recognizable facial proportions and illustrated rendering across the transformation. One adult subject, restrained expression, clear unobstructed face and silhouette. The result is a character design study with an unlettered backdrop.';
  const settings = {
    ratio: full ? '2:3' : '3:4',
    width: 1536,
    height: full ? 2304 : 2048,
    number_of_images: 1,
    batch_mode: false,
    sequential_generation: false,
    rewrite_prompt: false,
  };
  return {
    components,
    settings,
    inputs: { image_assets: [referenceAssetId], prompt, model: 'SEEDREAM_5', ...settings },
  };
}

export function stageCandidate(spec, request, receipt) {
  for (const id of [receipt.taskId, receipt.callId, receipt.providerAssetId]) z.uuid().parse(id);
  const extension = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp' }[
    receipt.mediaType
  ];
  if (!extension) throw Error('Unsupported output media type');
  // Rebuild the request rather than trusting a provider-supplied prompt or file path.
  const expected = buildRequest(spec, request.inputs.image_assets[0]);
  if (JSON.stringify(request) !== JSON.stringify(expected))
    throw Error('Request does not match structured spec');
  return {
    spec,
    role: 'staging',
    approvalStatus: 'pending',
    file: 'art/staging/evelynn/' + spec.assetId + '.' + extension,
    sha256: receipt.sha256,
    generation: {
      provider,
      tool: 'image_editor',
      taskId: receipt.taskId,
      callId: receipt.callId,
      providerAssetId: receipt.providerAssetId,
      model: 'SEEDREAM_5',
      sourceReferences: [
        { assetId: 'evelynn-helix-gala-v1', providerAssetId: request.inputs.image_assets[0] },
      ],
      promptVersion,
      promptComponents: request.components,
      prompt: request.inputs.prompt,
      settings: request.settings,
      createdAt: receipt.createdAt,
      estimatedCredits: receipt.estimatedCredits,
      mediaType: receipt.mediaType,
      outputDimensions: receipt.outputDimensions,
    },
  };
}
