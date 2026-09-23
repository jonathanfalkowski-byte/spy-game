/** Chapter 7 state helpers (shared by the confirm beat and the route chapters). */
import type { GameState } from '../state/schema';
import type { Block, NodeId } from './schema';

export type C7Scene = { title: string; place: string; blocks: Block[] };
export type C7Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
export const get7 = (s: GameState, k: string) => s.choices['c7.' + k];
export const set7 = (s: GameState, k: string, v = 'yes') => {
  s.choices['c7.' + k] = v;
};
/** Route and own-power keys live outside the c7 prefix so later chapters read them by name. */
export const getKey = (s: GameState, k: string) => s.choices[k];
export const setKey = (s: GameState, k: string, v = 'yes') => {
  s.choices[k] = v;
};
export const offer7 = (id: string, label: string, hint: string, next: string, apply?: C7Choice['apply']): C7Choice => ({
  id: 'chapter7.' + id,
  label,
  hint,
  next,
  apply,
});

export const chapter7Playable = (s: GameState) =>
  (s.contentRevision ?? 0) >= 19 && import.meta.env.VITE_EVE_CHAPTER7 === '1';

/** Sourced Chapter 7 record, stored like note5/note6 (history-indexed). */
export function note7(s: GameState, key: string, text: string, source: string) {
  if (get7(s, 'rec.' + key) !== undefined) return;
  set7(s, 'rec.' + key, String(s.history.length));
  set7(s, 'event.' + key, String(s.revision));
  set7(s, 'layer.' + key, 'fact');
  s.history.push({
    node: `${s.scene}.${s.phase}` as NodeId,
    blocks: [
      { kind: 'notice', text },
      { kind: 'notice', text: 'Source: ' + source },
    ],
  });
  s.facts.push('c7.' + key);
  s.knowledge.push('c7.' + key);
}

