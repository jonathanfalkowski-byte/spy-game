import { expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { homeSceneArt } from '../../src/ui/home-scene-art';
import { initialState, act } from '../../src/state/reducer';
import { missionStart, runMission } from '../mission-helpers';
import approved from '../../art/production/apartment/records.json';

it('publishes only the six owner-authorized originals plus the owner-approved noir relight', () => {
  expect(approved).toHaveLength(7);
  expect(approved.map((r) => r.spec.assetId)).toContain('apartment-post-glasshouse-executive-noir-v2-production');
  for (const r of approved) {
    expect(r.role).toBe('production'); expect(r.approvalStatus).toBe('approved');
    const files = r.runtimeEligibility === 'runtime-approved' ? [r.file, r.file.replace('art/production/', 'public/art/')] : [r.file];
    for (const file of files)
      expect(createHash('sha256').update(readFileSync(file)).digest('hex')).toBe(r.sha256);
  }
});
it('shows no transformed home image before treatment, off-site, or after Scene 1', () => {
  expect(homeSceneArt(initialState())).toBeNull();
  expect(homeSceneArt(missionStart())).toBeNull();
  expect(homeSceneArt(runMission(missionStart(), {}, 'car'))).toBeNull();
  const home = act(runMission(), {type:'CONTINUE_CHAPTER3'});
  expect(homeSceneArt(home)).not.toBeNull();
  for (const id of ['mirror','clothing','evidence','phone']) expect(homeSceneArt(act(home,{type:'CHAPTER3_CHOOSE',id:'chapter3.'+id}))).toBeNull();
  expect(homeSceneArt({...home, phase:'mayaContact'})).toBeNull();
  expect(homeSceneArt({...home, clinic:{...home.clinic, stage:'face'}})).toBeNull();
});
