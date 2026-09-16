import { test, expect, type Page } from '@playwright/test';
import { missionStart, runMission } from '../mission-helpers';
import { act } from '../../src/state/reducer';
import { encodeSave, decodeSave, SAVE_KEY } from '../../src/persistence/saves';
import type { GameState } from '../../src/state/schema';
async function seed(page: Page, state: GameState) {
  await page.goto('/');
  await page.evaluate(({key,raw})=>localStorage.setItem(key,raw),{key:SAVE_KEY,raw:encodeSave(state)});
  await page.reload();
}
for(const home of [false,true]) test(`content 12 ${home?'apartment':'direct'} route offers expanded choices`,async({page},info)=>{
  const errors: string[]=[];page.on('pageerror',e=>errors.push(e.message));
  await seed(page,runMission(missionStart(),{complete:home?'home.begin':'mission.begin'},'celesteReply'));
  await page.locator('[data-mission-choice="cover.begin"]').click();
  await expect(page.locator('[data-mission-choice="cover.test"]')).toBeVisible();
  await page.locator('[data-mission-choice="cover.test"]').click();
  await expect(page.locator('#story')).toContainText('no independent memory');
  await seed(page,runMission(missionStart(),{complete:home?'home.begin':'mission.begin'},'hub'));
  for(const id of ['security','staff','restricted']) await expect(page.locator(`[data-mission-choice="lead.${id}"]`)).toBeVisible();
  await page.screenshot({path:info.outputPath('expanded-route.png'),fullPage:true});
  expect(errors).toEqual([]);
});
for(const response of ['scope','challenge','withhold']) test(`Chapter 3 ${response} preserves reply and unresolved check-in`,async({page},info)=>{
  let state=act(runMission(),{type:'CONTINUE_CHAPTER3'});
  state=act(state,{type:'CHAPTER3_CHOOSE',id:'chapter3.phone'});
  await seed(page,state);
  await page.locator(`[data-chapter3-choice="chapter3.${response}"]`).click();
  const expected=response==='scope'?'individual recipients':response==='challenge'?'will not debate':'unanswered';
  await expect(page.locator('#story')).toContainText(expected);
  await expect(page.locator('.rail')).toContainText('Chapter 3 / Scene 1');
  await page.reload();
  await expect(page.locator('#story')).toContainText(expected);
  const raw=await page.evaluate(key=>localStorage.getItem(key),SAVE_KEY);
  expect(decodeSave(raw!).phase).toBe('complete');
  await expect(page.locator('#story')).not.toContainText(/\bEvelyn\b/);
  await page.screenshot({path:info.outputPath('chapter3-'+response+'.png'),fullPage:true});
});
