import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';
import { identities } from '../../src/content/identities';
import { presentedIdentityIntroduction } from '../../src/content/characters';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { act, initialState, replay } from '../../src/state/reducer';
import { sceneBlocks, sceneById } from '../../src/content/scenes';
import {
  displayName,
  readingBlocks,
  renderCanonicalIdentityText,
  renderCurrentPresentationText,
} from '../../src/ui/reading-presentation';
import { apply, connect, toAnalysis } from '../helpers';
import { end4, walk5 } from '../chapter5-helpers';

it('normalizes legacy identity forms only at the player-facing boundary', () => {
  expect(renderCanonicalIdentityText('Evelyn Vale')).toBe('Evelynn Vale');
  expect(renderCanonicalIdentityText('EVELYN VALE')).toBe('EVELYNN VALE');
  expect(renderCanonicalIdentityText('Evelyn’s photograph / Evelyn\'s name')).toBe(
    'Evelynn’s photograph / Evelynn\'s name',
  );
  expect(renderCanonicalIdentityText('EVELYN\'S RECORD')).toBe("EVELYNN'S RECORD");
  expect(renderCanonicalIdentityText('evelyn / Evelyn / Evelynn')).toBe(
    'evelyn / Evelynn / Evelynn',
  );
  expect(displayName('Evelyn Vale')).toBe('Evelynn Vale');
});

it('preserves raw historical identity text, stable IDs, saves and replay', () => {
  const source = readFileSync('src/content/day.ts', 'utf8');
  expect(source).toContain('Evelyn Vale already has an invitation');
  expect(source).toContain('EVELYN VALE');
  expect(source).toContain('Evelyn’s photograph');
  expect(presentedIdentityIntroduction.name).toBe('Evelyn Vale');
  expect(identities.find((identity) => identity.id === 'evelyn')?.displayName).toBe('Evelynn Vale');

  const state = initialState();
  expect(state.contentRevision).toBe(13);
  const before = encodeSave(state);
  const rendered = renderCanonicalIdentityText('Evelyn Vale is the archival spelling.');
  expect(rendered).toBe('Evelynn Vale is the archival spelling.');
  expect(encodeSave(state)).toBe(before);
  expect(replay(state.ledger, state.contentRevision ?? 17)).toEqual(state);
});

it('renders the corrected helix submission copy without changing frozen history or saves', () => {
  let state = connect(toAnalysis());
  state = apply(state, { type: 'REVIEW_ASSESSMENT', id: 'bounded' });
  state = apply(state, { type: 'SUBMIT_ASSESSMENT' });
  expect(state.contentRevision).toBe(13);

  const historicalEntry = state.history.find((entry) => entry.node === 'helix.submitted');
  expect(historicalEntry).toBeDefined();
  const rawText = historicalEntry!.blocks[0].text;
  const historicalCopy = 'the records and connections you chose to attach';
  const currentCopy = 'the records you reviewed and the connections you recorded';
  expect(rawText).toContain(historicalCopy);
  expect(rawText).not.toContain(currentCopy);

  const rawSave = encodeSave(state);
  expect(rawSave).toContain(historicalCopy);
  expect(rawSave).not.toContain(currentCopy);
  expect(replay(state.ledger, 13)).toEqual(state);
  expect(encodeSave(replay(state.ledger, 13))).toBe(rawSave);

  const visible = readingBlocks(historicalEntry!.blocks, 'helix.submitted')
    .map((block) => block.text)
    .join(' ');
  expect(visible).toContain(currentCopy);
  expect(visible).not.toContain(historicalCopy);
  expect(renderCurrentPresentationText(sceneById['helix.submitted'].blocks[0].text, 'helix.submitted')).toBe(
    sceneById['helix.submitted'].blocks[0].text,
  );
  expect(sceneBlocks({ ...state, scene: 'helix', phase: 'submitted' })[0].text).toContain(
    historicalCopy,
  );

  const restored = decodeSave(rawSave);
  expect(encodeSave(restored)).toBe(rawSave);
  const restoredEntry = restored.history.find((entry) => entry.node === 'helix.submitted');
  expect(restoredEntry!.blocks[0].text).toContain(historicalCopy);
  expect(readingBlocks(restoredEntry!.blocks, 'helix.submitted')[0].text).toContain(currentCopy);
});

it('keeps Chapter 5 route state deterministic while rendered history uses Evelynn', () => {
  const start = act(end4(), { type: 'CONTINUE_AUDIT_REVISION' });
  const state = walk5(start, [
    'begin',
    'go-spend',
    'spend-nothing',
    'echo-listing',
    'invitation-decline',
    'look-minimal',
    'leave-room',
    'offer-decline',
    'service-municipal',
    'terms-refuse',
    'people-finish',
    'want-none',
    'place-unchanged',
  ]);
  const visible = state.history
    .flatMap((entry) => readingBlocks(entry.blocks, entry.node))
    .map((block) => displayName(block.text))
    .join('\n');
  expect(visible).not.toMatch(/\bEvelyn\b/);
  expect(visible).toContain('Evelynn');
  expect(replay(state.ledger, 17)).toEqual(state);
});
