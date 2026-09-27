import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { act, replay } from '../../src/state/reducer';
import type { GameState } from '../../src/state/schema';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter7Choices } from '../../src/content/chapter7';
import { chapter8Choices } from '../../src/content/chapter8';
import { chapter9Choices } from '../../src/content/chapter9';
import { currentPlace } from '../../src/ui/chapter4-presentation';
import { c6, complete19, ids as ids6, settle6, text, walk } from '../chapter6-helpers';

beforeEach(() => {
  for (const n of [6, 7, 8, 9]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

const ids7 = (s: GameState) => chapter7Choices(s).map((c) => c.id.replace(/^chapter7\./, ''));
const ids = (s: GameState) => chapter8Choices(s).map((c) => c.id.replace(/^chapter8\./, ''));
const step = (type: 'CHAPTER7_CHOOSE' | 'CHAPTER8_CHOOSE', prefix: string, list: (s: GameState) => string[]) => (s: GameState, id: string) => {
  const next = act(s, { type, id: prefix + id } as never);
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.phase + ': ' + list(s).join(', '));
  return next;
};
const c7 = step('CHAPTER7_CHOOSE', 'chapter7.', ids7);
const c8 = step('CHAPTER8_CHOOSE', 'chapter8.', ids);
/** The deepening pass's Thursday night stands in front of Friday: take its neutral pick when it is in the way. */
const NEUTRAL8 = ['night-home'];
const walk8 = (s: GameState, path: string[]) =>
  path.reduce((x, id) => {
    let y = x;
    for (let i = 0; i < 3 && !ids(y).includes(id); i++) {
      const n = NEUTRAL8.find((d) => ids(y).includes(d));
      if (!n) break;
      y = c8(y, n);
    }
    return c8(y, id);
  }, s);
/** A real save (the maximal-julian golden) played through Chapter 6 into Predator, and through Chapter 7. */
const atFloor = (ch7: string[] = ['car-quiet', 'view-sit', 'want-money', 'clause-exit', 'clause-access', 'clause-report', 'julian-truth', 'lever-read', 'visit-busy', 'offer-evening-alone'], flags: Record<string, string> = {}) => {
  let s = walk(complete19('maximal-julian'), ['begin', 'benefit-accept']);
  s = c6(s, ids6(s).includes('expect-negotiate') ? 'expect-negotiate' : 'expect-clarify');
  s = walk(s, ['counter-skip', 'friction-done', 'exit-deepen', 'proof-decline']);
  s = settle6(c6(settle6(s), 'counterpower-decide'));
  s = c6(s, 'resolve-enforce');
  s = ['begin', 'route-confirm', ...ch7].reduce(c7, s);
  if (Object.keys(flags).length) {
    s = structuredClone(s);
    Object.assign(s.choices, flags);
  }
  return s;
};

it('opens The Floor from a Predator Chapter 7, not the bridge', () => {
  const s = atFloor();
  expect(`${s.scene}.${s.phase}`).toBe('chapter7.complete');
  expect(ids(s)).toEqual(['begin-predator']);
  expect(chapter9Choices(s)).toEqual([]);
  const weeks = c8(s, 'begin-predator');
  expect(weeks.phase).toBe('weeks');
  expect(text(weeks)).toContain('the one who always holds the door is the one nobody listens to');
  expect(text(weeks)).toContain('Mr Pryce is polishing the long black car');
  expect(text(weeks)).toContain('Two of them, before somebody notices me pulling.');
});

it('offers four levers (the press only with a public face), each use / hold / spare, with the archive free on the access clause', () => {
  const hub = c8(c8(atFloor(), 'begin-predator'), 'weeks-begin');
  expect(hub.phase).toBe('hub');
  expect(ids(hub)).toEqual(['pull-hollis', 'pull-counsel', 'pull-archive']);
  expect(ids(c8(c8(atFloor(undefined, { 'c5.published': 'yes' }), 'begin-predator'), 'weeks-begin'))).toContain('pull-press');
  const archive = c8(hub, 'pull-archive');
  expect(currentPlace(archive, 'x')).toBe('Day 15 · The records vault, sub-basement');
  expect(text(archive)).toContain('He is Elias Benton’s brother-in-law. He sells garden furniture.');
  expect(archive.facts).toContain('c8.p8-archive');
  expect(ids(archive)).toEqual(['archive-use', 'archive-hold', 'archive-spare']);
  // Free with the access clause: the hub stays open after it.
  const kept = c8(archive, 'archive-hold');
  expect([kept.phase, kept.choices['pred.lever8.archive'], kept.choices['c8.p-pulls'], kept.choices['pred.lsf']]).toEqual(['hub', 'hold', '0', 'wire']);
  const counsel = c8(kept, 'pull-counsel');
  expect(text(counsel)).toContain('His hand is on the back of her neck.');
  const spared = c8(counsel, 'counsel-spare');
  expect(text(spared)).toContain('And not because you could make me.');
  expect(spared.phase).toBe('hub');
  const second = c8(c8(spared, 'pull-hollis'), 'hollis-use');
  expect([second.phase, second.choices['pred.hollis']]).toEqual(['hub', 'owned']);
  // The report clause: only Marcus notices.
  expect(text(second)).toContain('Two in a fortnight. Most people take a year.');
  // Thursday night (deepening pass), then Friday, where the price of each lever comes back.
  expect(ids(second)).toEqual(['night-pryce', 'night-home']);
  const pryce = c8(second, 'night-pryce');
  expect([pryce.phase, pryce.choices['c8.p-night']]).toEqual(['friday', 'pryce']);
  expect(text(pryce)).toContain('It’s the fund he’s afraid of. Not you. Not yet.');
  expect(text(pryce)).toContain('from Mrs Hollis, with a card');
  expect(text(pryce)).toContain('there is a coffee on your desk when you arrive');
  expect(text(pryce)).toContain('It’s the one you sit in when you come to my office.');
  const maya = walk8(atFloor(undefined, { 'c6.maya': 'restored' }), ['begin-predator', 'weeks-begin', 'pull-counsel', 'counsel-hold', 'hub-stop']);
  expect(ids(maya)).toEqual(['night-pryce', 'night-maya', 'night-home']);
  expect(text(c8(maya, 'night-maya'))).toContain('Keep one thing in your life that isn’t a lever. Keep me.');
});

it('turns Friday drinks, names the fund on every path, and lets the exit clause walk', () => {
  const noLever = walk8(atFloor(), ['begin-predator', 'weeks-begin', 'pull-counsel', 'counsel-hold', 'hub-stop', 'night-home']);
  expect(noLever.phase).toBe('friday');
  expect(text(noLever)).toContain('So. What have you found?');
  expect(ids(noLever)).toEqual(['friday-tell', 'friday-lie', 'friday-trade', 'friday-walk']);
  const lied = c8(noLever, 'friday-lie');
  expect([lied.phase, lied.choices['pred.lsf']]).toEqual(['julian', 'boast']);
  expect(text(lied)).toContain('a woman in London who likes to own things quietly');
  expect(text(c8(noLever, 'friday-walk'))).toContain('Stay, would you? I’d miss the view.');
});

it('brings Julian’s Chapter 7 stance due', () => {
  const toJulian = (ch7Julian: string) =>
    walk8(atFloor(['car-quiet', 'view-sit', 'want-money', 'clause-exit', 'clause-access', 'clause-report', ch7Julian, 'lever-read', 'visit-busy', 'offer-evening-alone']), ['begin-predator', 'weeks-begin', 'pull-hollis', 'hollis-hold', 'pull-counsel', 'counsel-hold', 'friday-lie']);
  const ally = toJulian('julian-truth');
  expect(ids(ally)).toEqual(['julian8-take', 'julian8-thank']);
  expect(c8(ally, 'julian8-take').facts).toContain('c8.p8-lyle');
  expect(ids(toJulian('julian-lie'))).toEqual(['julian8-use', 'julian8-hold', 'julian8-spare']);
  expect(ids(toJulian('julian-past'))).toEqual(['julian8-confront', 'julian8-shrug']);
});

it('keeps the evening chosen, consented and stoppable, ends on the fund, and authenticates', () => {
  const evening = walk8(atFloor(), ['begin-predator', 'weeks-begin', 'pull-hollis', 'hollis-spare', 'pull-counsel', 'counsel-spare', 'friday-trade', 'julian8-thank']);
  expect(evening.phase).toBe('evening');
  expect(ids(evening)).toEqual(['p8-evening-marcus', 'p8-evening-julian', 'p8-evening-alone']);
  const invited = c8(evening, 'p8-evening-marcus');
  expect(text(invited)).toContain('a mother who cleaned offices like this one at night');
  const chose = c8(invited, 'p8-marcus-no-sex');
  expect(chose.facts).toContain('c8.p8-evening-consent');
  expect(ids(chose)).toEqual(['p8-stop', 'p8-stay']);
  expect(c8(chose, 'p8-stop').choices['c8.p-evening-outcome']).toBe('withdrawn');
  const done = c8(evening, 'p8-evening-alone');
  expect(`${done.scene}.${done.phase}`).toBe('chapter8.complete');
  expect(text(done)).toContain('HOLLIS: SPARE. VARGA: SPARE.');
  expect(text(done)).toContain('L.S.F. ADVISORY. Cream paper. Old money.');
  expect(chapter9Choices(done).map((c) => c.id)).toEqual(['chapter9.begin-placeholder']);
  expect(chapter9Choices(done)[0].label).toBe('Follow the fund');
  expect(replay(done.ledger, 19)).toEqual(done);
  expect(decodeSave(encodeSave(done))).toEqual(done);
});
