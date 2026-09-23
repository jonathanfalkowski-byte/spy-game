/** Chapter 6 state helpers. Chapter 6 is additive inside revision 19: it is reached only through
 * CHAPTER6_CHOOSE, so no pre-Chapter-6 ledger changes (guarded by tests/state/rev19-golden.test.ts).
 * Design: docs/story/CHAPTER_6_PROOF_AND_COUNTERPOWER.md and the Chapter 6 build plan. */
import { optionalNpc, type GameState } from '../state/schema';
import { type Block, type NodeId } from './schema';
import { get5, records5 } from './chapter5-model';
import { records4 } from './chapter4-model';

export type C6Scene = { title: string; place: string; blocks: Block[] };
export type C6Choice = {
  id: string;
  label: string;
  hint: string;
  next: string;
  apply?: (s: GameState) => Block[];
};
export const get6 = (s: GameState, k: string) => s.choices['c6.' + k];
export const set6 = (s: GameState, k: string, v = 'yes') => {
  s.choices['c6.' + k] = v;
};
export const offer6 = (id: string, label: string, hint: string, next: string, apply?: C6Choice['apply']): C6Choice => ({
  id: 'chapter6.' + id,
  label,
  hint,
  next,
  apply,
});

/** Chapter 6 is only offered to revision 19 or later and only while the build gate is open.
 * The gate stays closed in production until the chapter's prose is in (dev: VITE_EVE_CHAPTER6=1). */
export const chapter6Playable = (s: GameState) =>
  (s.contentRevision ?? 0) >= 19 && import.meta.env.VITE_EVE_CHAPTER6 === '1';

/** Sourced Chapter 6 record, stored like note5 (history-indexed) so journals can read it. */
export function note6(s: GameState, key: string, text: string, source: string, layer: 'fact' | 'claim' = 'fact') {
  if (get6(s, 'rec.' + key) !== undefined) return;
  set6(s, 'rec.' + key, String(s.history.length));
  set6(s, 'event.' + key, String(s.revision));
  set6(s, 'layer.' + key, layer);
  s.history.push({
    node: `${s.scene}.${s.phase}` as NodeId,
    blocks: [
      { kind: 'notice', text },
      { kind: 'notice', text: 'Source: ' + source },
    ],
  });
  s[layer === 'fact' ? 'facts' : 'claims'].push('c6.' + key);
  s.knowledge.push('c6.' + key);
}

// ── Movement 1: the exit arrangement, derived once from stored Chapter 5 flags ──

export const exitArrangements6 = ['julian-workroom', 'public-artifact', 'sloane-institutional', 'self-funded'] as const;
export type ExitArrangement6 = (typeof exitArrangements6)[number];

/** First match wins. Rule 4 and the default are both the no-trap self-funded profile;
 * the basis records which one applied. */
export function exitArrangement6(s: GameState): { arrangement: ExitArrangement6; basis: string } {
  const service = get5(s, 'service');
  if (service === 'julian') return { arrangement: 'julian-workroom', basis: 'c5.service = julian' };
  if (get5(s, 'published')) return { arrangement: 'public-artifact', basis: 'c5.published' };
  if (get5(s, 'message-sloane') || service === 'axiom')
    return { arrangement: 'sloane-institutional', basis: get5(s, 'message-sloane') ? 'c5.message-sloane' : 'c5.service = axiom' };
  if (service === 'self' || service === 'municipal' || get5(s, 'terms') === 'self-funded')
    return { arrangement: 'self-funded', basis: service === 'self' || service === 'municipal' ? `c5.service = ${service}` : 'c5.terms = self-funded' };
  return { arrangement: 'self-funded', basis: 'default (no provider debt)' };
}

// ── Rook: created at chapter6.begin and backfilled from what Evelynn actually sent ──

type Observation = { key: string; source: string; event: number };
const received = (text: string) => {
  const at = text.indexOf(' received: ');
  return at < 0 ? text : text.slice(at + ' received: '.length);
};

/** Every earlier delivery to the sender, with its original source and event. */
export function rookBackfill6(s: GameState): Observation[] {
  const out: Observation[] = [];
  const log = s.day.records.find((r) => r.key === 'c3.delivery.rook');
  if (log)
    for (const entry of log.text.split('\n\n')) {
      const m = entry.match(/^Event (\d+) \(([^)]*)\) · ([^\n]*)\nrook received: ([\s\S]*)$/);
      if (m) out.push({ key: m[4], source: m[3], event: Number(m[1]) });
    }
  for (const r of [...records4(s), ...records5(s)])
    if (/^c[45]\.sent-\d+-rook$/.test(r.key)) out.push({ key: received(r.text), source: r.source, event: r.event });
  return out.sort((a, b) => a.event - b.event);
}

export function createRook6(s: GameState) {
  if (optionalNpc(s, 'rook')) return;
  Object.assign(s.npcs, { rook: { known: rookBackfill6(s), beliefs: [] } });
}

// ── Movement 6 inputs (derivations only; the endings are scripted later) ──

/** Current-operation leverage that supports an own-hand ending without any Rook trust. */
export function ownHandLeverage6(s: GameState): string[] {
  const held: string[] = [];
  if (s.mission.capture?.owner === 'Evelyn' || s.mission.token === 'evelyn') held.push('glass-house-item');
  if (s.choices['c3.verified-date']) held.push('c3.verified-date');
  if (get5(s, 'published')) held.push('c5.published');
  if (['accept', 'narrow', 'backup'].includes(get5(s, 'terms') ?? '') && get5(s, 'obligation-provider'))
    held.push('enforceable-term');
  return held;
}

export function endPosition6(s: GameState): 'oracle-truth' | 'own-hand' | 'both' | 'none' {
  const oracle = get6(s, 'oracle-seen') === 'yes';
  const own = ownHandLeverage6(s).length > 0;
  return oracle && own ? 'both' : oracle ? 'oracle-truth' : own ? 'own-hand' : 'none';
}
