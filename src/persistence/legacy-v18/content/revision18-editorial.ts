import packageJson from '../../../../docs/story/REVISION_18_EDITORIAL_PACKAGE.json';

export type Revision18EditorialEntry = {
  file: string;
  context: string;
  old: string;
  new: string;
  reason: string;
};

export const revision18EditorialEntries = packageJson.entries as readonly Revision18EditorialEntry[];

function entryApplies(entry: Revision18EditorialEntry, node?: string) {
  if (!node) return false;
  const context = entry.context.split(' ')[0];
  if (entry.file.endsWith('/chapter3.ts') || entry.file.includes('/chapter3-'))
    return node.startsWith('chapter3.');
  if (entry.file.includes('/chapter4-')) return node.startsWith('chapter4.');
  if (entry.file.includes('/chapter5-')) return node.startsWith('chapter5.');
  if (entry.file.endsWith('/clinic.ts')) return node.startsWith('clinic.');
  if (entry.file.endsWith('/mission.ts')) return node.startsWith('mission.');
  if (entry.file.endsWith('/day.ts')) return (
    node.startsWith('day.') ||
    node.startsWith('file.') ||
    node.startsWith('security.') ||
    node.startsWith('sloane.') ||
    node.startsWith('refusal.') ||
    node.startsWith('dayend.')
  );
  if (entry.file.endsWith('/scenes.ts')) return context ? node === context : false;
  if (entry.file.endsWith('/dialogue.ts')) {
    if (context.startsWith('promotion.')) return node === 'office.benton';
    if (context.startsWith('benton.')) return node === 'office.departure';
    if (context.startsWith('mayaPromotion.')) return node === 'maya.invitation';
    return false;
  }
  return false;
}

/**
 * Revision-18 presentation only. This never mutates state, history, NPC
 * knowledge, proof records or ledger actions. Exact old literals are replaced
 * only when the originating node matches the source file/context scope.
 */
export function renderRevision18Text(raw: string, node?: string): string {
  let rendered = raw;
  for (const entry of revision18EditorialEntries) {
    if (!entryApplies(entry, node) || !rendered.includes(entry.old)) continue;
    rendered = rendered.split(entry.old).join(entry.new);
  }
  return rendered;
}

export function revision18ChoiceCopy<T extends { label: string; hint: string }>(choice: T, node?: string): T {
  return {
    ...choice,
    label: renderRevision18Text(choice.label, node),
    hint: renderRevision18Text(choice.hint, node),
  };
}

export function revision18SceneCopy<T extends { title: string; place?: string; continueLabel?: string }>(scene: T, node?: string): T {
  return {
    ...scene,
    title: renderRevision18Text(scene.title, node),
    place: scene.place === undefined ? scene.place : renderRevision18Text(scene.place, node),
    continueLabel:
      scene.continueLabel === undefined
        ? scene.continueLabel
        : renderRevision18Text(scene.continueLabel, node),
  };
}
