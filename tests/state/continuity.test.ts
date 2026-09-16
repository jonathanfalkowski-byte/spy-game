import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mission, missionStart, runMission } from '../mission-helpers';
import { act, replay } from '../../src/state/reducer';
import { availableMissionChoices } from '../../src/content/mission';
import { sceneBlocks } from '../../src/content/scenes';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { replay as frozenReplay } from '../../src/persistence/legacy-v11/state/reducer';
import { clinicScenes } from '../../src/content/clinic';
import { missionScenes } from '../../src/content/mission';
import { journalEntries } from '../../src/ui/journal-entries';

const text = (s: ReturnType<typeof missionStart>) => s.history.flatMap(h => h.blocks.map(b => b.text)).join('\n');
const chapter = (home = false, method = 'audio') => act(runMission(missionStart(), {complete: home ? 'home.begin' : 'mission.begin', method: 'method.' + method}), {type:'CONTINUE_CHAPTER3'});
describe('content 12 continuity', () => {
  it('orders both itineraries with time for residential travel and arrival before the invitation', () => {
    const scenes=[...clinicScenes,...missionScenes];
    const minutes=(id:string)=>{const place=scenes.find(s=>s.id===id)!.place; const [h,m]=place.slice(0,5).split(':').map(Number);return h*60+m;};
    for(const home of [false,true]) {
      const ids=['clinic.farewell','clinic.departure','clinic.complete',...(home?['mission.home','mission.homePresentation','mission.homeContact']:[]),'mission.car','mission.arrival'];
      const times=ids.map(minutes);
      expect(times.every((n,i)=>i===0||n>times[i-1])).toBe(true);
      expect(times.at(-1)).toBeLessThan(19*60);
    }
    expect(minutes('mission.home')-minutes('clinic.departure')).toBeGreaterThanOrEqual(15);
  });
  it('withdraws Celeste’s hand once and places Marcus before his observations',()=>{
    const state=mission(runMission(missionStart(),{},'celesteReply'),'cover.begin');
    expect((text(state).match(/Celeste withdraws her hand/g)||[])).toHaveLength(1);
    expect(text(state)).toContain('near end of the central table');
    const partial=mission(state,'cover.partial');
    expect(text(partial)).toContain('her words do not carry to him');
    expect(partial.npcs.marcus.known.some(k=>k.key.includes('Halcyon'))).toBe(false);
  });
  it('normalizes displayed journal spelling without altering stored historical data',()=>{
    const old=frozenReplay(runMission().ledger);
    const before=JSON.stringify(old);
    expect(JSON.stringify(journalEntries(old))).not.toMatch(/\bEvelyn\b/);
    expect(JSON.stringify(old)).toBe(before);
  });
  it.each(['executive', 'socialite', 'shadow'])('enters cover without unchosen consequences for %s', outfit => {
    const before = runMission(missionStart(outfit), {}, 'celesteReply');
    const after = mission(before, 'cover.begin');
    expect(after.phase).toBe('cover');
    expect(after.mission.scrutiny).toBe(before.mission.scrutiny);
    expect(after.npcs).toEqual(before.npcs);
    expect(after.day.records).toEqual(before.day.records);
    for (const response of ['test','bluff','partial','redirect','presentation']) {
      const selected = mission(after, 'cover.' + response);
      expect(selected.mission.completed).toContain('cover.' + response);
      expect(selected.day.records.some(r => r.key === 'mission.cover.presentation')).toBe(response === 'presentation');
      expect(selected.npcs.marcus.known.some(k => k.key.includes('ended their private exchange in public'))).toBe(response === 'presentation');
      expect(decodeSave(encodeSave(selected))).toEqual(selected);
    }
  });
  it('keeps optional home unrelated to available cover questions and leads', () => {
    for (const phase of ['celesteReply','marcusReply','hub']) {
      const choices = (home: boolean) => availableMissionChoices(runMission(missionStart(), {complete: home ? 'home.begin' : 'mission.begin'}, phase)).map(c => c.id);
      expect(choices(false)).toEqual(choices(true));
    }
  });
  it('inspects only pre-mission belongings and preserves final clothes on both routes', () => {
    for (const outfit of ['executive','socialite','shadow']) {
      const start = missionStart(outfit);
      const inspected = mission(mission(start, 'home.begin'), 'home.evidence');
      expect(inspected.mission.capture).toEqual(start.mission.capture);
      const record = inspected.day.records.find(r => r.key === 'mission.home.evidence')!;
      expect(record.text).not.toMatch(/photograph|audio|token|wafer|capture/i);
      expect(text(inspected)).toContain('clinic');
      const prepared = mission(mission(inspected,'home.prepare'),'home.outfit.shadow');
      expect(runMission(prepared, {}, 'arrival').clinic.outfit).toBe('shadow');
      expect(runMission(start, {}, 'arrival').clinic.outfit).toBe(outfit);
    }
  });
  it('does not promise a third lead after two investigations', () => {
    let hub = runMission(missionStart(), {}, 'hub');
    for (const lead of ['guest','service']) {
      hub = mission(mission(mission(hub,'lead.'+lead),'lead.confirm'),'lead.return');
    }
    expect(hub.mission.remaining).toBe(0);
    const prose = sceneBlocks(hub).map(b=>b.text).join(' ');
    expect(prose).toContain('Both opportunities are spent');
    expect(prose).not.toContain('still room for another lead');
  });
  it('describes the location test as consistency, not independent verification', () => {
    const state = mission(mission(runMission(missionStart(),{},'celesteReply'),'cover.begin'),'cover.test');
    expect(text(state)).toContain('no independent memory');
    expect(state.day.records.find(r=>r.key==='mission.cover.correction')?.layer).toBe('claim');
    expect(state.npcs.marcus.known.some(k=>/Marina Room|Blue Orchid/.test(k.key))).toBe(false);
  });
  it.each(['scope','challenge','confirm','withhold'])('preserves the actual %s exchange through reload', response => {
    let state = act(chapter(), {type:'CHAPTER3_CHOOSE',id:'chapter3.phone'});
    const before = state.npcs.sloane;
    state = act(state,{type:'CHAPTER3_CHOOSE',id:'chapter3.'+response});
    expect(state.phase).toBe('complete');
    expect(decodeSave(encodeSave(state))).toEqual(state);
    if(response==='withhold') {
      expect(state.npcs.sloane).toEqual(before);
      expect(text(state)).toContain('without a sent message');
      expect(sceneBlocks(state).map(b=>b.text).join(' ')).toContain('unanswered');
    } else {
      expect(text(state)).toContain(response==='scope' ? 'individual recipients' : response==='challenge' ? 'will not debate' : 'Received.');
      expect(state.npcs.sloane).not.toEqual(before);
    }
    if(response==='scope'||response==='challenge') expect(state.day.records.find(r=>r.key==='chapter3_monitoring_scope')?.layer).toBe('claim');
  });
  it('does not invent earlier private actions in the return-home callbacks', () => {
    const state=act(chapter(),{type:'CHAPTER3_CHOOSE',id:'chapter3.mirror'});
    expect(text(state)).not.toContain('earlier mirror');
    const audio=act(chapter(false,'audio'),{type:'CHAPTER3_CHOOSE',id:'chapter3.evidence'});
    expect(text(audio)).toContain('no independent copy');
    const photo=act(chapter(false,'photo'),{type:'CHAPTER3_CHOOSE',id:'chapter3.evidence'});
    expect(text(photo)).toContain('photograph is on the monitored phone');
  });
});
describe('frozen content 11 boundary',()=>{
  it('freezes every dependency byte against the reviewed commit',()=>{
    const manifest=JSON.parse(readFileSync('src/persistence/content-11-hashes.json','utf8'));
    for(const [file,hash] of Object.entries(manifest.files)) {
      const frozen=readFileSync('src/persistence/legacy-v11/'+file);
      expect(createHash('sha256').update(frozen).digest('hex')).toBe(hash);
      expect(frozen.equals(execFileSync('git',['show',manifest.sourceCommit+':src/'+file]))).toBe(true);
    }
  });
  it.each([false,true])('preserves legacy snapshot and continuation (home %s)', home=>{
    const current=runMission(missionStart(),{complete:home?'home.begin':'mission.begin'},'celesteReply');
    const old=frozenReplay(current.ledger);
    const raw=JSON.stringify({schemaVersion:5,contentVersion:home?11:10,state:old});
    expect(decodeSave(raw)).toEqual(old);
    expect(replay(old.ledger,11)).toEqual(old);
    const next=act(old,{type:'MISSION_CHOOSE',id:home?'cover.begin':'celeste.close'});
    expect(next).toEqual(frozenReplay(next.ledger));
  });
  it('rejects mismatched snapshot and envelope revisions',()=>{
    const save=JSON.parse(encodeSave(missionStart()));
    save.contentVersion=11;
    expect(()=>decodeSave(JSON.stringify(save))).toThrow();
    save.contentVersion=12;
    delete save.state.contentRevision;
    expect(()=>decodeSave(JSON.stringify(save))).toThrow();
  });
});
