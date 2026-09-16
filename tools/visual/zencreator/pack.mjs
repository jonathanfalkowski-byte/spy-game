// Pure offline request builder. No provider/network, approval or filesystem operations.
import { z } from 'zod';
export function buildPackRequest(entry, references) {
  if (!/^eve-(cast|bg|scene|c3)-[a-z0-9-]+-v1$/.test(entry.spec.assetId))
    throw Error('Invalid pack asset ID');
  if (entry.spec.styleBibleVersion !== '1.0') throw Error('Unknown Art Bible');
  if (!['cast', 'background', 'scene'].includes(entry.kind)) throw Error('Unknown pack kind');
  if (references.length !== entry.references.length || references.length === 0)
    throw Error('Incomplete references');
  for (let i = 0; i < references.length; i++) {
    z.uuid().parse(references[i].providerAssetId);
    if (references[i].assetId !== entry.references[i].assetId)
      throw Error('Reference order mismatch');
  }
  const portrait = entry.kind === 'cast';
  const components = {
    STYLE:
      'Match the supplied EVE illustration language: polished 2D adult espionage graphic novel, confident clean ink linework, semi-cel shading, graphic shadows, controlled highlights, believable adult anatomy, restrained rich color and subtle illustrated texture.',
    SUBJECT: portrait
      ? entry.direction
      : entry.kind === 'background'
        ? 'Empty environment, with no people or human reflections.'
        : 'Use the supplied character references for recognizable distinct faces, hair, age and build. Clothing follows the scene instruction.',
    SCENE: entry.direction,
    CAMERA: entry.spec.cameraFraming + '. ' + (entry.spec.cameraAngle ?? 'Eye level'),
    LIGHTING: entry.spec.lighting,
    CONTINUITY:
      entry.guard +
      ' This artwork is a visual proposal only. Unlettered surfaces and unreadable screens; no captions, labels, speech balloons or watermarks.',
  };
  const referenceDescription = entry.references
    .map((r, i) => 'Reference ' + (i + 1) + ': ' + r.purpose + '.')
    .join(' ');
  const action = portrait
    ? 'Transform the style reference into a new single-character portrait of the described person. Preserve only the rendering style; give this person their own distinct face, hair and clothing. Leave generous headroom; include the complete hairstyle.'
    : entry.kind === 'background'
      ? 'Replace the reference composition with the described empty location. Preserve its illustration style only; remove the reference people and render the new architecture in a wide composition.'
      : 'Recompose the location from Reference 1 and place the supplied characters into this authored moment. Preserve recognizable identities and location design; change pose, camera and clothing as specified. Include all heads comfortably inside the frame.';
  const prompt =
    referenceDescription +
    '\n' +
    action +
    '\n' +
    Object.entries(components)
      .map(([k, v]) => k + ': ' + v)
      .join('\n');
  const settings = {
    ratio: portrait ? '3:4' : '16:9',
    width: portrait ? 1536 : 1920,
    height: portrait ? 2048 : 1080,
    number_of_images: 1,
    batch_mode: false,
    sequential_generation: false,
    rewrite_prompt: false,
  };
  return {
    components,
    settings,
    sourceReferences: references,
    inputs: {
      image_assets: references.map((r) => r.providerAssetId),
      prompt,
      model: 'SEEDREAM_5',
      ...settings,
    },
  };
}

export function buildTextCastRequest(entry) {
  if (entry.kind !== 'cast' || !/^eve-cast-[a-z0-9-]+-v1$/.test(entry.spec.assetId))
    throw Error('Text-only workflow is for cast designs');
  const components = {
    STYLE:
      'Polished 2D adult espionage graphic-novel illustration. Confident clean ink lines, angular graphic facial planes, semi-cel shadows, restrained highlights, illustrated skin, charcoal and muted jewel palette.',
    SUBJECT: entry.direction,
    SCENE: 'Single character on a plain charcoal gradient background.',
    CAMERA:
      'Head-and-shoulders portrait, near-front three-quarter view, complete hair visible with generous headroom.',
    LIGHTING: 'Soft directional key, thin warm rim light, controlled noir contrast.',
    CONTINUITY: 'Provisional design based on sourced appearance; neutral professional expression.',
  };
  const prompt = [
    components.SUBJECT,
    components.SCENE,
    components.CAMERA,
    components.LIGHTING,
    components.STYLE,
    components.CONTINUITY,
  ].join(' ');
  const settings = {
    ratio: '3:4',
    width: 1536,
    height: 2048,
    batch_size: 1,
    mode: 'quality',
    rewrite_prompt: false,
  };
  return {
    toolName: 'by_prompt',
    components,
    settings,
    sourceReferences: [],
    inputs: { positive_prompt: prompt, model: 'SEEDREAM_5', ...settings },
  };
}
export function stagePackCandidate(entry, request, receipt) {
  const expected =
    request.toolName === 'by_prompt'
      ? buildTextCastRequest(entry)
      : buildPackRequest(entry, request.sourceReferences);
  if (JSON.stringify(expected) !== JSON.stringify(request))
    throw Error('Request changed after assembly');
  for (const value of [receipt.taskId, receipt.callId, receipt.providerAssetId])
    z.uuid().parse(value);
  const extension = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp' }[
    receipt.mediaType
  ];
  if (!extension) throw Error('Unsupported output format');
  return {
    spec: entry.spec,
    role: 'staging',
    approvalStatus: 'pending',
    file: 'art/staging/cast-scenes/' + entry.spec.assetId + '.' + extension,
    sha256: receipt.sha256,
    generation: {
      provider: 'zencreator',
      tool: request.toolName ?? 'image_editor',
      model: 'SEEDREAM_5',
      taskId: receipt.taskId,
      callId: receipt.callId,
      providerAssetId: receipt.providerAssetId,
      sourceReferences: request.sourceReferences,
      promptVersion: 'eve-cast-scenes-v1',
      promptComponents: request.components,
      prompt: request.inputs.prompt ?? request.inputs.positive_prompt,
      settings: request.settings,
      createdAt: receipt.createdAt,
      estimatedCredits: receipt.estimatedCredits,
      mediaType: receipt.mediaType,
      outputDimensions: receipt.outputDimensions,
    },
  };
}
