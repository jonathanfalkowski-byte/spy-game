import { expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { selectVisual, visualDimensions, type VisualCandidate, type VisualContext } from '../../src/visual/selection';
const context: VisualContext = {node:'mission.exchange',outfit:'socialite',treatmentStage:'stage-one-complete',participants:'evelynn+benton+marcus',timing:'on-time',evidence:'handover-observed',phase:'transfer-visible',location:'glass-gallery'};
const guards = Object.fromEntries(visualDimensions.map(key=>[key,[context[key]]])) as VisualCandidate['guards'];
const frame: VisualCandidate = {assetId:'test-frame',kind:'keyframe',role:'production',approvalStatus:'approved',guards};
it.each(visualDimensions)('fails closed for a mismatched or unknown %s',key=>{
  expect(selectVisual({...context,[key]:'unknown'},[frame])).toBeNull();
  expect(selectVisual(context,[{...frame,guards:{...guards,[key]:undefined}}])).toBeNull();
});
it('selects only reviewed complete matches and otherwise an approved neutral variant or nothing',()=>{
  expect(selectVisual(context,[frame])).toBe('test-frame');
  const neutral: VisualCandidate={...frame,assetId:'test-neutral',kind:'neutral'};
  expect(selectVisual(context,[{...frame,role:'staging'},neutral])).toBe('test-neutral');
  expect(selectVisual(context,[{...frame,approvalStatus:'pending'}])).toBeNull();
});
it('keeps the current staging map disabled and location branches explicit',()=>{
  const map=JSON.parse(readFileSync('art/staging/cast-scenes/coverage.json','utf8'));
  expect(map.runtimeBinding).toBe(false);
  const node=(id:string)=>map.runtimeNodes.find((n:any)=>n.node===id);
  expect(node('security.escort').neutralBackground).toBeNull();
  expect(node('security.escort').requiredLocation).toBe('Axiom secure elevator, Level 71');
  expect(node('refusal.reconsider').neutralBackground).toBe('eve-bg-sloane-office-continuity-v2');
  for(const id of ['evening.disclosure','evening.closure','evening.goodbye']) {
    expect(node(id).neutralBackground).toBeNull();
    expect(node(id).locationVariants.map((v:any)=>v.when.evening)).toEqual(['meet','call']);
  }
});
