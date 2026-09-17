import type { GameState } from '../../../state/schema';
import { paragraph as p, type Block, type NodeId } from './schema';
export type C4Choice = {
  id: string;
  label: string;
  hint: string;
  next: string;
  apply?: (s: GameState) => Block[];
};
export type C4Scene = { title: string; place: string; blocks: Block[] };
export const get4 = (s: GameState, key: string) => s.choices['c4.' + key];
export const set4 = (s: GameState, key: string, value = 'yes') => {
  s.choices['c4.' + key] = value;
};
export const old = (s: GameState, key: string) => s.choices['c3.' + key];
export const offer4 = (
  id: string,
  label: string,
  hint: string,
  next: string,
  apply?: C4Choice['apply'],
): C4Choice => ({ id: 'chapter4.' + id, label, hint, next, apply });
/** Existing typed history is the durable record store; indices are authenticated by replay. */
export function note4(
  s: GameState,
  key: string,
  text: string,
  source: string,
  layer: 'fact' | 'claim' = 'fact',
) {
  if (get4(s, 'rec.' + key) !== undefined) return;
  set4(s, 'rec.' + key, String(s.history.length));
  set4(s, 'event.' + key, String(s.revision));
  set4(s, 'layer.' + key, layer);
  s.history.push({
    node: `${s.scene}.${s.phase}` as NodeId,
    blocks: [
      { kind: 'notice', text },
      { kind: 'notice', text: 'Source: ' + source },
    ],
  });
  s[layer === 'fact' ? 'facts' : 'claims'].push('c4.' + key);
  s.knowledge.push('c4.' + key);
}
export function read4(s: GameState, key: string) {
  const index = get4(s, 'rec.' + key);
  if (index === undefined) return undefined;
  const entry = s.history[Number(index)];
  if (!entry) return undefined;
  return {
    key: 'c4.' + key,
    text: entry.blocks[0].text,
    source: entry.blocks[1].text.replace(/^Source: /, ''),
    event: Number(get4(s, 'event.' + key)),
    layer: get4(s, 'layer.' + key) as 'fact' | 'claim',
  };
}
export const records4 = (s: GameState) =>
  Object.keys(s.choices)
    .filter((k) => k.startsWith('c4.rec.'))
    .map((k) => read4(s, k.slice(7))!);
export function send4(s: GameState, to: string, text: string, source: string) {
  if (Object.hasOwn(s.npcs, to))
    s.npcs[to as keyof GameState['npcs']].known.push({ key: text, source, event: s.revision });
  note4(s, 'sent-' + s.revision + '-' + to, `${to} received: ${text}`, source);
}
export function asset4(s: GameState, key: string, text: string, source: string) {
  note4(s, key, text, source);
  s.proof.push({ key: 'c4.' + key, source: text + ' Source: ' + source, owner: 'Evelynn' });
}
export const recipients4 = ['sloane', 'julian-mercer', 'rook', 'voss', 'maya'] as const;
export const names4: Record<string, string> = {
  sloane: 'Sloane',
  'julian-mercer': 'Julian Mercer',
  rook: 'the unknown sender',
  voss: 'Voss',
  maya: 'Maya',
  own: 'the walk',
};
export const oldRecord = (s: GameState, key: string) =>
  s.day.records.find((r) => r.key === 'c3.' + key);
export const boundary4 = [
  p('The Axiom monitoring indicator remains lit as you step onto the path.'),
];
