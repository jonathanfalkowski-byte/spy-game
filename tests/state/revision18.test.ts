import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';
import packageJson from '../../docs/story/REVISION_18_EDITORIAL_PACKAGE.json';
import provenance from '../../docs/story/REVISION_17_FROZEN_PROVENANCE.json';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { renderRevision18Text } from '../../src/content/revision18-editorial';
import { renderCurrentPresentationText } from '../../src/ui/reading-presentation';
import { act, availableChoices, initialState, replay } from '../../src/state/reducer';
import { scene2, chooseEvening } from '../chapter3-evening-helpers';
import { end4 } from '../chapter5-helpers';
import { journalEntries } from '../../src/ui/journal-entries';
import { sceneBlocks } from '../../src/content/scenes';
import { readingBlocks } from '../../src/ui/reading-presentation';

it('records the frozen revision-17 provenance and complete revision-18 editorial package', () => {
  expect(packageJson.entries).toHaveLength(86);
  expect(new Set(packageJson.entries.map((entry) => `${entry.file}\u0000${entry.old}`)).size).toBe(86);
  expect(provenance.contentRevision).toBe(17);
  expect(provenance.baselineCommit).toMatch(/^[0-9a-f]{40}$/);
  expect(Object.keys(provenance.files).length).toBeGreaterThan(30);
  for (const record of Object.values(provenance.files))
    expect(record.sha256).toMatch(/^[0-9a-f]{64}$/);
});

it('starts revision-18 games on the frozen engine while preserving the historical fixture default', () => {
  expect(initialState().contentRevision).toBe(13);
  const state = initialState(18);
  expect(state.contentRevision).toBe(18);
  const first = availableChoices(state)[0];
  expect(first).toBeDefined();
  const next = act(state, { type: 'CHOOSE_DIALOGUE', id: first.id });
  expect(next).not.toBe(state);
  expect(next.contentRevision).toBe(18);
  expect(next.ledger).toHaveLength(1);
});

it('round-trips a revision-18 opening event ledger without changing its state', () => {
  const first = availableChoices(initialState(18))[0];
  const state = act(initialState(18), { type: 'CHOOSE_DIALOGUE', id: first.id });
  const raw = encodeSave(state);
  expect(JSON.parse(raw).contentVersion).toBe(18);
  expect(decodeSave(raw)).toEqual(state);
  expect(replay(state.ledger, 18)).toEqual(state);
});

it('replays the complete opening through Scene 2 and continues the revision-18 morning path', () => {
  const historicalRoute = scene2('lookup', { home: true });
  let state = replay(historicalRoute.ledger, 18);
  expect(`${state.scene}.${state.phase}`).toBe('chapter3.mayaContact');
  state = chooseEvening(state, 'no-contact');
  state = chooseEvening(state, 'pressure-challenge');
  state = chooseEvening(state, 'sleep');
  expect(`${state.scene}.${state.phase}`).toBe('chapter3.nightComplete');
  expect(availableChoices(state).length).toBe(0);
  state = chooseEvening(state, 'begin-followup');
  expect(`${state.scene}.${state.phase}`).toBe('chapter3.morningPlan');
  expect(state.contentRevision).toBe(18);
  expect(replay(state.ledger, 18)).toEqual(state);
});

it('applies revised copy at the presentation boundary and keeps raw text unchanged', () => {
  const old = 'The report leaves your terminal addressed to Benton only. Your selected conclusion remains in it, with the records and connections you chose to attach.';
  const next = renderCurrentPresentationText(old, 'helix.submitted', 18);
  expect(next).toContain('the records you reviewed and the connections you recorded');
  expect(old).toContain('the records and connections you chose to attach');
  expect(renderRevision18Text('The private encounter remains off-page. The scene fades.', 'chapter4.private')).toContain('encounter remains private');
  expect(renderRevision18Text('The private encounter remains off-page. The scene fades.', 'chapter5.desire')).toContain('encounter remains private');
  expect(renderRevision18Text('The private encounter remains off-page. The scene fades.', 'chapter4.private')).not.toBe(
    renderRevision18Text('The private encounter remains off-page. The scene fades.', 'chapter5.desire'),
  );
  const quoted = 'You close the finished report. For the first time in the conversation, the next words need care.';
  expect(renderRevision18Text(quoted, 'chapter5.complete')).toBe(quoted);
  expect(renderRevision18Text(quoted)).toBe(quoted);
});

it('projects revision-18 editorial wording into derived journal entries without mutating records', () => {
  const baseline = end4('intimate', 'personal', 'sex');
  const state = replay(baseline.ledger, 18);
  const raw = state.day.records.map((record) => record.text).join('\n') + state.history.flatMap((entry) => entry.blocks.map((block) => block.text)).join('\n');
  const entries = journalEntries(state);
  const newText = packageJson.entries.map((entry) => entry.new).find((value) => entries.some((entry) => entry.text.includes(value)));
  expect(newText).toBeDefined();
  expect(state.day.records.map((record) => record.text).join('\n') + state.history.flatMap((entry) => entry.blocks.map((block) => block.text)).join('\n')).toBe(raw);
});

it('applies dialogue response replacements at the authored destination nodes', () => {
  const dialogueEntries = packageJson.entries.filter((entry) => entry.file.endsWith('/dialogue.ts'));
  const nodeByContext: Record<string, string> = {
    'promotion.professional response': 'office.benton',
    'benton.promotion response': 'office.departure',
    'mayaPromotion.hurt response': 'maya.invitation',
  };
  for (const entry of dialogueEntries)
    expect(renderCurrentPresentationText(entry.old, nodeByContext[entry.context], 18)).toContain(entry.new);

  let state = initialState(18);
  state = act(state, { type: 'CHOOSE_DIALOGUE', id: 'bond.friend' });
  state = act(state, { type: 'CHOOSE_DIALOGUE', id: 'morning.yes' });
  state = act(state, { type: 'CONTINUE' });
  state = act(state, { type: 'CONTINUE' });
  state = act(state, { type: 'CHOOSE_DIALOGUE', id: 'promotion.professional' });
  expect(readingBlocks(sceneBlocks(state), 'office.benton', 18).map((block) => block.text).join(' ')).toContain(
    dialogueEntries[0].new,
  );
});

it('covers every reviewed editorial entry at its source node', () => {
  const dialogueDestination: Record<string, string> = {
    'promotion.professional response': 'office.benton',
    'benton.promotion response': 'office.departure',
    'mayaPromotion.hurt response': 'maya.invitation',
  };
  for (const entry of packageJson.entries) {
    const context = entry.context.split(' ')[0];
    let node = context;
    if (entry.file.endsWith('/dialogue.ts')) node = dialogueDestination[entry.context];
    else if (!context.includes('.')) {
      const base = entry.file.split('/').at(-1)!.replace(/\.ts$/, '');
      const chapterPrefix = base.match(/^chapter\d+/)?.[0];
      const prefix = base === 'scenes' ? '' : chapterPrefix ? chapterPrefix + '.' : base + '.';
      node = prefix + context;
    }
    expect(node, entry.context).toBeTruthy();
    expect(renderCurrentPresentationText(entry.old, node, 18), `${entry.file} ${entry.context}`).toContain(entry.new);
  }
});

it('authenticates the frozen baseline hashes against the retained Git blobs', () => {
  for (const [path, record] of Object.entries(provenance.files)) {
    const bytes = execFileSync('git', ['show', `${provenance.baselineCommit}:${path}`]);
    expect(createHash('sha256').update(bytes).digest('hex')).toBe(record.sha256);
  }
  expect(readFileSync('docs/story/REVISION_17_FROZEN_PROVENANCE.json', 'utf8')).toContain(
    provenance.baselineCommit,
  );
}, 30_000);
