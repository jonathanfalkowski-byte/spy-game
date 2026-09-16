import type { GameState } from '../state/schema';
import type { Block } from './schema';
export type NextChoice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
export const flag = (s: GameState, key: string) => s.choices['c3.' + key];
export const mark = (s: GameState, key: string, value = 'yes') => { s.choices['c3.' + key] = value; };
export function record(s: GameState, key: string, text: string, source: string, layer: 'fact'|'claim' = 'fact') {
  const id = 'c3.' + key;
  if (s.day.records.some(r => r.key === id)) return;
  s.day.records.push({key:id,text,source,layer,event:s.revision});
  s[layer === 'fact' ? 'facts' : 'claims'].push(id); s.knowledge.push(id);
}
export function deliver(s: GameState, recipient: keyof GameState['npcs']|'rook'|'julian-mercer', key: string, text: string, source: string) {
  record(s, `delivery.${recipient}.${key}`, `${recipient} received: ${text}`, source);
  if (recipient !== 'rook' && recipient !== 'julian-mercer') s.npcs[recipient].known.push({key:text,source,event:s.revision});
  // New contacts use existing sourced records, without changing schema-5 NPC structure.
}
export const choice = (id: string, label: string, hint: string, next: string, apply?: NextChoice['apply']): NextChoice => ({id:'chapter3.'+id,label,hint,next,apply});
