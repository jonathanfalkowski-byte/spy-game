import golden from './fixtures/rev19-golden-ledgers.json';
import type { GameEvent } from '../src/state/actions';
import type { GameState } from '../src/state/schema';
import { act, replay } from '../src/state/reducer';
import { chapter6Choices } from '../src/content/chapter6';
import { identityDisclosure } from '../src/state/chapter3-provenance';

export const ids = (s: GameState) => chapter6Choices(s).map((c) => c.id.replace(/^chapter6\./, ''));
export const text = (s: GameState) => s.history.flatMap((h) => h.blocks.map((b) => b.text)).join('\n');
export const c6 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER6_CHOOSE', id: 'chapter6.' + id });
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.phase);
  return next;
};
export const walk = (s: GameState, path: string[]) => path.reduce(c6, s);
export const complete19 = (name: string) => replay(golden.routes.find((r) => r.name === name)!.ledger as GameEvent[], 19);

export type Setup = {
  item?: boolean;
  verified?: boolean;
  greeting?: boolean;
  misdirect?: boolean;
  mayaKnows?: boolean;
  love?: boolean;
  flags?: Record<string, string>;
};

/** A revision-19 Chapter 5 complete save shaped to a test case (clean Chapter 5 position unless flags add one). */
export function chapter5Complete(opts: Setup = {}) {
  const s = complete19('public-want-none');
  s.mission = {
    ...s.mission,
    capture: opts.item ? { ...(s.mission.capture ?? { quality: 'asset', axiomAccess: '', text: '', limits: '' }), owner: 'Evelyn' } : null,
    token: 'benton',
  };
  for (const [key, on] of [['c3.verified-date', opts.verified], ['c3.misdirect-rook', opts.misdirect]] as const)
    if (on) s.choices[key] = 'yes';
    else delete s.choices[key];
  s.day.records = s.day.records.filter((r) => r.key !== 'mission.celeste-greeting');
  if (opts.greeting)
    s.day.records.push({ key: 'mission.celeste-greeting', layer: 'claim', text: 'Celeste greets Evelyn as someone who left before breakfast in Singapore.', source: 'test', event: 1 });
  s.npcs.maya.known = s.npcs.maya.known.filter((k) => k.key !== identityDisclosure);
  if (opts.mayaKnows) s.npcs.maya.known.push({ key: identityDisclosure, source: 'Evelynn’s delivered Scene 2 message on the monitored phone', event: 1 });
  s.relationships.bond = opts.love ? 'love' : 'friend';
  for (const k of ['service', 'published', 'message-sloane', 'terms', 'obligation-provider', 'obligation-term', 'maya-clean-line', 'offer'])
    delete s.choices['c5.' + k];
  Object.assign(s.choices, opts.flags ?? {});
  return s;
}

/** Through movements 1–4 on the lightest path (skip the Counter) into the proof. */
export function toProof(opts: Setup = {}, counter: string[] = ['counter-skip']) {
  let s = walk(chapter5Complete(opts), ['begin', 'benefit-accept']);
  s = c6(s, ids(s).includes('expect-selfnote') ? 'expect-selfnote' : 'expect-clarify');
  s = walk(s, [...counter, 'friction-done', 'exit-hold']);
  if (s.phase !== 'proof') throw Error('not at proof: ' + s.phase);
  return s;
}
