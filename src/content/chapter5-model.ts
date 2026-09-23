import type { GameState } from '../state/schema';
import { paragraph as p, type Block, type NodeId } from './schema';
import { get4, old, oldRecord } from './chapter4-model';
import { characters } from './characters';
import { adultEligibility } from './character-schema';
export { get4, old, oldRecord };
export type C5Scene = { title: string; place: string; blocks: Block[] };
export type C5Choice = {
  id: string;
  label: string;
  hint: string;
  next: string;
  apply?: (s: GameState) => Block[];
};
export const get5 = (s: GameState, k: string) => s.choices['c5.' + k];
export const set5 = (s: GameState, k: string, v = 'yes') => {
  s.choices['c5.' + k] = v;
};
export const offer5 = (
  id: string,
  label: string,
  hint: string,
  next: string,
  apply?: C5Choice['apply'],
): C5Choice => ({ id: 'chapter5.' + id, label, hint, next, apply });
export function note5(
  s: GameState,
  key: string,
  text: string,
  source: string,
  layer: 'fact' | 'claim' = 'fact',
) {
  if (get5(s, 'rec.' + key) !== undefined) return;
  set5(s, 'rec.' + key, String(s.history.length));
  set5(s, 'event.' + key, String(s.revision));
  set5(s, 'layer.' + key, layer);
  s.history.push({
    node: `${s.scene}.${s.phase}` as NodeId,
    blocks: [
      { kind: 'notice', text },
      { kind: 'notice', text: 'Source: ' + source },
    ],
  });
  s[layer === 'fact' ? 'facts' : 'claims'].push('c5.' + key);
  s.knowledge.push('c5.' + key);
}
export function read5(s: GameState, key: string) {
  const n = get5(s, 'rec.' + key);
  if (n === undefined) return undefined;
  const h = s.history[Number(n)];
  if (!h) return undefined;
  return {
    key: 'c5.' + key,
    text: h.blocks[0].text,
    source: h.blocks[1].text.replace(/^Source: /, ''),
    event: Number(get5(s, 'event.' + key)),
    layer: get5(s, 'layer.' + key) as 'fact' | 'claim',
  };
}
export const records5 = (s: GameState) =>
  Object.keys(s.choices)
    .filter((k) => k.startsWith('c5.rec.'))
    .map((k) => read5(s, k.slice(7))!);
export const names5: Record<string, string> = {
  'julian-mercer': 'Julian Mercer',
  rook: 'Unknown sender',
  maya: 'Maya',
  sloane: 'Sloane',
  voss: 'Voss',
  aster: 'Aster editor',
  harbour: 'Harbour coordinator',
};
export function send5(s: GameState, to: string, text: string, source: string) {
  if (Object.hasOwn(s.npcs, to))
    s.npcs[to as keyof GameState['npcs']].known.push({ key: text, source, event: s.revision });
  note5(s, 'sent-' + s.revision + '-' + to, `${names5[to] ?? to} received: ${text}`, source);
}
export const cash5 = (s: GameState) => Number(get5(s, 'cash') ?? get4(s, 'income') ?? 0);
export const voucher5 = (s: GameState) =>
  old(s, 'paid') === '600' && !get4(s, 'redeemed') && !get5(s, 'voucher-redeemed');
export function money5(s: GameState, key: string, amount: number, source: string) {
  if (read5(s, 'money-' + key)) throw Error('Duplicate transaction');
  const balance = cash5(s) + amount;
  if (!Number.isSafeInteger(balance) || balance < 0) throw Error('Insufficient earned funds');
  set5(s, 'cash', String(balance));
  note5(
    s,
    'money-' + key,
    `${amount < 0 ? 'Spent' : 'Received'} $${Math.abs(amount)}. Personally controlled balance: $${balance}.`,
    source,
  );
}
export const julian5 = (s: GameState) =>
  get4(s, 'audit-paid') === '900' &&
  get4(s, 'julian-kept') === 'yes' &&
  old(s, 'helix-window') === 'offered' &&
  get4(s, 'method') !== 'exploit' &&
  !get4(s, 'personal-withdrawn');
export const mutual5 = (s: GameState) =>
  julian5(s) && !!(get5(s, 'mutual-interest') || get4(s, 'mutual-interest'));
export const ownsPublication5 = (s: GameState) => !!get5(s, 'published');
export const finish5 = (s: GameState, key: string, value: string, text: string) => {
  set5(s, key, value);
  return [p(text)];
};
/** Current intimate authorization with a named partner. Julian's conditions are unchanged;
 * Sebastian (revision 19) needs only his own fresh consent step. */
export const intimatePartner5 = (s: GameState) =>
  get5(s, 'want-target') === 'julian'
    ? 'julian-mercer'
    : get5(s, 'want-target') === 'sebastian' && s.contentRevision === 19
      ? 'sebastian'
      : undefined;
export const intimate5 = (s: GameState) => {
  const partner = intimatePartner5(s);
  return (
    !!partner &&
    (partner !== 'julian-mercer' || mutual5(s)) &&
    get5(s, 'authorization') === 'granted' &&
    get5(s, 'willingness') === 'willing' &&
    ['player-character', partner].every((id) => {
      const c = characters.find((c) => c.id === id);
      return !!c && adultEligibility(c) === 'adult';
    })
  );
};
