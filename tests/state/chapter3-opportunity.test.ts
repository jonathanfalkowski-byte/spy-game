import {it,expect} from 'vitest';
import {information,choose} from '../chapter3-next-helpers';
import {nextChoices} from '../../src/content/chapter3-next';
import {invitationBasis,publicityCaption} from '../../src/content/chapter3-opportunity';
import {StateSchema} from '../../src/state/schema';
import {encodeSave,decodeSave} from '../../src/persistence/saves';
import {replay} from '../../src/state/reducer';
export function reception(){let s=information();for(const id of ['open-invitation','request-brief','check-authority','check-audience','accept-session','open-case','case-boundary'])s=choose(s,id);return s;}
it('uses a stored observation, not private investigations, and limits inquiries',()=>{
 const old=information();let s=choose(old,'open-invitation');
 expect(s.npcs.sloane).toEqual(old.npcs.sloane);
 expect(s.day.records.find(r=>r.key==='c3.referral')?.text).toContain(invitationBasis(old).text);
 const altered=structuredClone(old);altered.mission.source='priya';altered.mission.method='photo';
 expect(invitationBasis(altered)).toEqual(invitationBasis(old));
 for(const id of ['request-brief','check-authority','check-audience'])s=choose(s,id);
 expect(nextChoices(s).filter(c=>c.id.startsWith('chapter3.check-'))).toHaveLength(0);
 expect(s.day.records.some(r=>r.key==='c3.check-axiom')).toBe(false);
 expect(s.npcs.sloane).toEqual(old.npcs.sloane);
});
it.each(['embrace','negotiate','exploit','refuse'])('completes reception %s with earned fee intact',(route)=>{
 const old=reception();let s=choose(old,'reception-'+route);
 if(s.phase==='photograph')s=choose(s,'photo-refuse');
 expect(s.choices['c3.paid']).toBe('600');
 expect(s.proof.find(p=>p.key==='c3.fee')).toEqual(old.proof.find(p=>p.key==='c3.fee'));
 expect(s.day.records.some(r=>r.key==='c3.public-association')).toBe(false);
 expect(s.relationships).toEqual(old.relationships);
 expect(s.npcs.sloane).toEqual(old.npcs.sloane);
 expect(StateSchema.parse(s)).toEqual(s);expect(replay(s.ledger,14)).toEqual(s);expect(decodeSave(encodeSave(s))).toEqual(s);
 if(route==='exploit')expect(s.day.records.some(r=>r.key==='c3.procurement')).toBe(true);
 if(route==='negotiate')expect(s.day.records.find(r=>r.key==='c3.introduction')?.text).toBe('Evelynn Vale, our guest today.');
});
it('publishes only the explicitly authorized image and caption without global discovery',()=>{
 const old=reception();const s=choose(choose(old,'reception-embrace'),'photo-publish');
 expect(s.day.records.find(r=>r.key==='c3.public-association')?.text).toContain(publicityCaption);
 expect(s.day.records.find(r=>r.key==='c3.photo-scope')?.text).toContain('No licensing');
 for(const id of ['sloane','maya','voss','marcus'] as const)expect(s.npcs[id]).toEqual(old.npcs[id]);
 expect(decodeSave(encodeSave(s))).toEqual(s);
});
