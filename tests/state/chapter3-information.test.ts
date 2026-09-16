import {it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {morning,information,choose} from '../chapter3-next-helpers';
import {act,replay} from '../../src/state/reducer';
import {replay as frozen} from '../../src/persistence/legacy-v13/state/reducer';
import {StateSchema} from '../../src/state/schema';
import {encodeSave,decodeSave} from '../../src/persistence/saves';
import {characters} from '../../src/content/characters';
it('freezes every revision-13 dependency byte against the source commit',()=>{
 const root='src/persistence/legacy-v13/';
 const manifest=JSON.parse(readFileSync(root+'content-13-hashes.json','utf8'));
 for(const [file,hash] of Object.entries(manifest.files)){
   const bytes=readFileSync(root+file);
   expect(createHash('sha256').update(bytes).digest('hex')).toBe(hash);
   expect(bytes.equals(execFileSync('git',['show',manifest.sourceCommit+':src/'+file]))).toBe(true);
 }
});
it('authenticates 13 before crossing to 14, preserving the exact prefix',()=>{
 const old=morning();expect(frozen(old.ledger)).toEqual(old);
 expect(decodeSave(encodeSave(old))).toEqual(old);
 const next=choose(old,'begin-followup');expect(next.contentRevision).toBe(14);
 expect(next.ledger.slice(0,old.ledger.length)).toEqual(old.ledger);
 expect(next.history.slice(0,old.history.length)).toEqual(old.history);
 const forged=structuredClone(old);forged.facts.push('fabricated');
 expect(act(forged,{type:'CHAPTER3_CHOOSE',id:'chapter3.begin-followup'})).toBe(forged);
 expect(()=>replay(next.ledger,13)).toThrow();
 expect(()=>decodeSave(JSON.stringify({schemaVersion:5,contentVersion:14,state:{...old,contentRevision:14}}))).toThrow();
});
it('keeps consent and sourced knowledge separate and replays schema 5',()=>{
 const before=morning(),s=information();expect(StateSchema.parse(s)).toEqual(s);
 expect(replay(s.ledger,14)).toEqual(s);expect(decodeSave(encodeSave(s))).toEqual(s);
 expect(s.clinic).toEqual(before.clinic);expect(s.relationships).toEqual(before.relationships);
 expect(s.npcs.sloane).toEqual(before.npcs.sloane);
 expect(s.npcs.voss.known.slice(before.npcs.voss.known.length).some(x=>/Maya|sender/.test(x.key))).toBe(false);
 expect(s.proof.some(p=>p.key==='c3.instruction')).toBe(true);
 expect(JSON.stringify(s.history)).toContain('Consultation 3');
 expect(s.day.records.find(r=>r.key==='c3.prognosis')?.layer).toBe('claim');
 expect(s.day.records.find(r=>r.key==='c3.care-plan')?.text).toContain('not authorization');
});
it('registers approved Julian canon without relationship assumptions',()=>{
 const c=characters.find(c=>c.id==='julian-mercer')!;
 expect(c.displayName).toBe('Julian Mercer');expect(c.canon.age?.years).toBe(49);
 expect(c.introduction.role).toBe('Helix Group COO');expect(c.canon.objectives).toBeUndefined();
 expect(c.canon.facts.some(f=>f.text.includes('major adult'))).toBe(true);
});
