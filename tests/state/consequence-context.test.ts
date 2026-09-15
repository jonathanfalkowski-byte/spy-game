import { expect, it } from 'vitest';
import { atOffer, checkpoint } from '../day-helpers';
import { projectConsequenceBeats } from '../../src/narrative/consequence-beats';
import { projectNarratorContext } from '../../src/narrative/context';
import { deriveConsequences } from '../../src/state/consequences';
import { nodeOf, replay } from '../../src/state/reducer';
import { choice, toMaya } from '../helpers';
import { runMission, missionStart } from '../mission-helpers';
import { npcPersonaObservations, playerView } from '../../src/state/player';

it('projects an existing visible callback without its hidden power data or identity binding', () => {
  const state = atOffer('maya', 'arrest', 'need', 'evelyn', true);
  const view = deriveConsequences(state);
  const grant = {
    node: nodeOf(state),
    revision: state.revision,
    characterId: 'sloane',
    consequenceIds: view.consequences.filter((e) => e.kind === 'callback').map((e) => e.id),
  };
  const result = projectConsequenceBeats(state, grant);
  expect(result.kind).toBe('projected');
  if (result.kind !== 'projected') throw Error('Expected projection');
  expect(result.context.beats).toEqual([
    'The incident material concerning Maya remains in Sloane’s file.',
  ]);
  expect(result.context.npcObservations).toEqual([]);
  const text = JSON.stringify(result.context);
  for (const secret of [
    'mappedChange',
    'supportingRecords',
    'threatened',
    'player-character',
    'voss_lookup',
    'leverageId',
  ])
    expect(text).not.toContain(secret);
  expect(projectConsequenceBeats(state, { ...grant, revision: state.revision - 1 }).kind).toBe(
    'authored-fallback',
  );
  expect(projectConsequenceBeats(state, { ...grant, consequenceIds: ['unknown'] }).kind).toBe(
    'authored-fallback',
  );
  expect(
    projectConsequenceBeats(state, {
      ...grant,
      consequenceIds: Array(4).fill(grant.consequenceIds[0]),
    }).kind,
  ).toBe('authored-fallback');
  expect(projectConsequenceBeats(state, { ...grant, characterId: 'maya' }).kind).toBe(
    'authored-fallback',
  );
  const earlier = replay(state.ledger.slice(0, state.revision - 1));
  expect(
    projectConsequenceBeats(earlier, {
      ...grant,
      node: nodeOf(earlier),
      revision: earlier.revision,
    }).kind,
  ).toBe('authored-fallback');
});
it('normal context does not automatically receive relationship or leverage records', () => {
  const state = atOffer('maya');
  const result = projectNarratorContext(state, {
    node: nodeOf(state),
    revision: state.revision,
    characterId: 'sloane',
    canon: [],
    playerKnowledge: [],
    npcObservations: [],
    beats: [],
  });
  expect(result.beats).toEqual([]);
  expect(result).not.toHaveProperty('leverage');
  expect(result).not.toHaveProperty('relationships');
});

it('keeps the affected character continuous under Evelynn without leaking binding through recognition', () => {
  const state = runMission(missionStart(), {}, 'celesteReply');
  const view = deriveConsequences(state);
  expect(playerView(state).presentation?.identityId).toBe('evelyn');
  expect(view.relationships[0].targetCharacter).toBe(playerView(state).binding.characterId);
  const observation = npcPersonaObservations(state).find((o) => o.observerId === 'marcus')!;
  const context = projectNarratorContext(state, {
    node: nodeOf(state),
    revision: state.revision,
    characterId: 'marcus',
    canon: [],
    playerKnowledge: [],
    npcObservations: [],
    beats: [],
    personaObservations: [observation],
    identityDisplays: ['evelyn'],
  });
  expect(context.identityDisplays[0].displayName).toBe('Evelynn Vale');
  expect(JSON.stringify(context)).not.toMatch(
    /player-character|binding|mappedChange|relationships/,
  );
});

it('projects a displayed threat only after disclosure and keeps empty grants empty', () => {
  const future = atOffer('maya');
  const intro = future.ledger.find(
    (e) => e.action.type === 'DAY_CHOOSE' && e.action.id === 'intro.arrest',
  )!;
  const state = replay(future.ledger.slice(0, intro.sequence));
  const grant = {
    node: nodeOf(state),
    revision: state.revision,
    characterId: 'sloane',
    consequenceIds: deriveConsequences(state)
      .consequences.filter((e) => e.kind === 'leverage-status' && e.status === 'threatened')
      .map((e) => e.id),
  };
  expect(projectConsequenceBeats(state, grant).kind).toBe('projected');
  const empty = projectConsequenceBeats(state, { ...grant, consequenceIds: [] });
  expect(empty.kind).toBe('projected');
  if (empty.kind === 'projected') expect(empty.context.beats).toEqual([]);
});
it('allows an authored concern beat but refuses private quantitative trust', () => {
  const state = choice(
    choice(choice(toMaya(), 'mayaPromotion.hurt'), 'invitation.yes'),
    'disclosure.nothing',
  );
  const grant = {
    node: nodeOf(state),
    revision: state.revision,
    characterId: 'maya',
    consequenceIds: deriveConsequences(state).consequences.map((e) => e.id),
  };
  expect(projectConsequenceBeats(state, grant).kind).toBe('projected');
  const trusted = checkpoint(true);
  expect(
    projectConsequenceBeats(trusted, {
      ...grant,
      node: nodeOf(trusted),
      revision: trusted.revision,
      consequenceIds: deriveConsequences(trusted).consequences.map((e) => e.id),
    }).kind,
  ).toBe('authored-fallback');
});
