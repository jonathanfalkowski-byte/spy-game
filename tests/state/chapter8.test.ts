import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import golden7 from '../fixtures/rev19-chapter7-golden.json';
import type { GameEvent } from '../../src/state/actions';
import type { GameState } from '../../src/state/schema';
import { act, availableIntents, replay } from '../../src/state/reducer';
import { decodeSave, encodeSave } from '../../src/persistence/saves';
import { chapter8Choices } from '../../src/content/chapter8';
import { resolveSceneArt } from '../../src/ui/scene-art';
import { currentPlace } from '../../src/ui/chapter4-presentation';

beforeEach(() => {
  for (const n of [6, 7, 8]) vi.stubEnv(`VITE_EVE_CHAPTER${n}`, '1');
});
afterEach(() => vi.unstubAllEnvs());

const ids = (s: GameState) => chapter8Choices(s).map((c) => c.id.replace(/^chapter8\./, ''));
const text = (s: GameState) => s.history.flatMap((h) => h.blocks.map((b) => b.text)).join('\n');
const choose8 = (s: GameState, id: string) => {
  const next = act(s, { type: 'CHAPTER8_CHOOSE', id: 'chapter8.' + id });
  if (next === s) throw Error('Unavailable ' + id + ' at ' + s.phase);
  return next;
};
/** The new scenes (the work, the bank) settle on their neutral picks when a walk asks for a later move. */
const settle8 = ['neighbour-thank', 'work-hold', 'bank-leave', 'pryce-chain', 'talk-owner', 'bishop-cat', 'lotte-cafe', 'lotte-last', 'photos-back', 'wake-window', 'toast-leave', 'key-ring', 'board-leave', 'spare-keep', 'hack-door', 'call-down'];
const c8 = (s: GameState, id: string) => {
  let x = s;
  for (let i = 0; i < 10 && !ids(x).includes(id); i++) {
    const pending = ids(x).find((y) => settle8.includes(y));
    if (!pending) break;
    x = choose8(x, pending);
  }
  return choose8(x, id);
};
const walk = (s: GameState, path: string[]) => path.reduce(c8, s);
/** Take a road's own scene choice (the first one) to go over the wall. */
const through = (s: GameState) => c8(s, ids(s)[0]);
const complete7 = (name: string) => replay(golden7.routes.find((r) => r.name === name)!.ledger as GameEvent[], 19);
const withFlags = (s: GameState, flags: Record<string, string | undefined>) => {
  const x = structuredClone(s);
  for (const [k, v] of Object.entries(flags)) if (v === undefined) delete x.choices[k];
  else x.choices[k] = v;
  return x;
};
/** A clean leverage decision: no audience, ally, Julian access or Sloane contact unless a case adds one. */
const clean = {
  'c5.published': undefined, 'own.alliance.rook': undefined, 'c5.editor-contact': undefined, 'c6.maya': undefined,
  'c4.audit-paid': undefined, 'own.exposed': undefined,
};
const leverage = (flags: Record<string, string | undefined> = {}) =>
  walk(withFlags(complete7('own-records-stop'), { ...clean, ...flags }), ['begin', 'breakin-report', 'money-owing', 'cost-continue']);

it('opens only after an own-power Chapter 7 ending, and stays closed in production', () => {
  expect(ids(complete7('own-records-stop'))).toEqual(['begin']);
  expect(ids(complete7('outside-placeholder'))).toEqual([]);
  vi.stubEnv('VITE_EVE_CHAPTER8', '');
  expect(chapter8Choices(complete7('own-records-stop'))).toEqual([]);
  expect(JSON.stringify(availableIntents(complete7('own-records-stop')))).not.toContain('CHAPTER8');
});

it('names Meridian at the wall only if she found it, and brings in Sloane only if she was seen', () => {
  const found = c8(complete7('own-records-stop'), 'begin');
  expect(text(found)).toContain('at Meridian and whoever sits on its board');
  expect(text(found)).toContain('Nobody has come to you yet.');
  const unnamed = c8(complete7('own-maya-nothing'), 'begin');
  expect(text(unnamed)).toContain('something you cannot name yet');
  expect(text(unnamed)).not.toContain('Meridian');
  const seen = c8(withFlags(complete7('own-records-stop'), { 'own.exposed': 'yes' }), 'begin');
  expect(text(seen)).toContain('I could give you cover');
  const broke = c8(withFlags(complete7('own-records-stop'), { 'own.cash': '20' }), 'begin');
  expect(text(broke)).toContain('it counts back shorter than it did');
  expect(resolveSceneArt(found).art?.kind).toBe('environment');
});

it('offers one way over the wall per road, with the refusal always there', () => {
  expect(ids(leverage())).toEqual(['leverage-refuse-cross']);
  expect(ids(leverage({ 'c5.published': 'yes' }))).toContain('leverage-audience');
  expect(ids(leverage({ 'own.exposed': 'yes' }))).toContain('leverage-institutional');
  // One ally, by priority: the sender's debt, then the editor, then Maya.
  expect(ids(leverage({ 'own.alliance.rook': 'owed', 'c5.editor-contact': 'yes', 'c6.maya': 'restored' })).filter((x) => /rook|editor|maya/.test(x))).toEqual(['leverage-rook']);
  expect(ids(leverage({ 'c5.editor-contact': 'yes', 'c6.maya': 'restored' })).filter((x) => /rook|editor|maya/.test(x))).toEqual(['leverage-editor']);
  expect(ids(leverage({ 'c6.maya': 'restored' })).filter((x) => /rook|editor|maya/.test(x))).toEqual(['leverage-maya']);
  expect(ids(leverage({ 'c6.maya': 'paused-by-maya' }))).not.toContain('leverage-maya');
});

it('reaches the same core turn by every road, recording the road and any crossover', () => {
  const cases: [Record<string, string>, string, string, string][] = [
    [{ 'c5.published': 'yes' }, 'leverage-audience', 'audience', 'none'],
    [{ 'own.alliance.rook': 'owed' }, 'leverage-rook', 'rook', 'none'],
    [{ 'c5.editor-contact': 'yes' }, 'leverage-editor', 'editor', 'none'],
    [{ 'c6.maya': 'restored' }, 'leverage-maya', 'maya', 'none'],
    [{ 'own.exposed': 'yes' }, 'leverage-institutional', 'institutional', 'institutional'],
    [{}, 'leverage-refuse-cross', 'dig', 'none'],
  ];
  for (const [flags, road, entered, crossover] of cases) {
    const scene = c8(leverage(flags), road);
    expect(scene.phase, road).toBe('leverage');
    const s = through(scene);
    expect(s.phase, road).toBe('advance');
    expect([s.choices['c8.meridian'], s.choices['c8.entered'], s.choices['own.crossover']], road).toEqual(['product', entered, crossover]);
    expect(text(s)).toContain('Project Eve is a product. Axiom is a client.');
    expect(text(s)).toContain(crossover === 'none' ? 'you would not let anyone open the door for you' : 'someone opened a door for you');
    expect(s.choices['route.lane']).toBe('own-power');
    expect(() => encodeSave(s)).not.toThrow();
  }
  const rook = through(c8(leverage({ 'own.alliance.rook': 'owed' }), 'leverage-rook'));
  expect(rook.choices['own.alliance.rook']).toBe('spent');
  expect(text(rook)).toContain('a marker called, a patience spent');
  const maya = through(c8(leverage({ 'c6.maya': 'restored' }), 'leverage-maya'));
  expect(maya.choices['own.alliance.maya']).toBe('used');
  expect(text(maya)).not.toContain('a marker called, a patience spent');
  const loud = c8(leverage({ 'c5.published': 'yes' }), 'leverage-audience');
  expect(loud.choices['own.exposed']).toBe('yes-deep');
});

it('keeps the hard way open at any budget: the dig costs $120 or is recorded unpaid', () => {
  const paid = c8(leverage({ 'own.cash': '300' }), 'leverage-refuse-cross');
  expect([paid.choices['c8.dig-fee'], paid.choices['own.cash']]).toEqual(['paid', '180']);
  const unpaid = c8(leverage({ 'own.cash': '50' }), 'leverage-refuse-cross');
  expect([unpaid.choices['c8.dig-fee'], unpaid.choices['own.cash']]).toEqual(['unpaid', '0']);
});

it('plays a real own-power Chapter 8 to complete, and the save authenticates', () => {
  let s = walk(complete7('pivot-own-rook-debt'), ['begin', 'breakin-report', 'money-owing', 'cost-continue']);
  expect(ids(s)).toContain('leverage-rook');
  s = walk(s, ['leverage-rook', 'debt-true', 'list-read', 'lotte-cafe', 'lotte-last', 'photos-back', 'wake-window', 'toast-leave', 'key-ring', 'board-leave', 'spare-keep']);
  expect(text(s)).toContain('The next room is the one with the name in it');
  expect(text(s)).not.toContain('Except I did not stand entirely alone this time');
  expect(ids(s)).toEqual(['night-watch', 'night-walk', 'night-sleep']);
  s = walk(s, ['night-sleep', 'close-end']);
  expect(`${s.scene}.${s.phase}`).toBe('chapter8.complete');
  expect(chapter8Choices(s)).toEqual([]);
  expect(text(s)).toContain('Tomorrow you go looking for the name.');
  expect(replay(s.ledger, 19)).toEqual(s);
  expect(decodeSave(encodeSave(s))).toEqual(s);
  for (const node of ['chapter8.cost', 'chapter8.leverage', 'chapter8.advance', 'chapter8.close', 'chapter8.complete'])
    expect(s.history.some((h) => h.node === node), node).toBe(true);
});

it('lets her borrow Julian’s door once, remembered as a crossover without changing her road', () => {
  const julian = { 'c4.audit-paid': '900', 'c4.julian-kept': 'yes', 'c3.helix-window': 'offered', 'c4.method': undefined, 'c4.personal-withdrawn': undefined };
  expect(ids(leverage(julian))).toContain('leverage-executive');
  const s = walk(leverage(julian), ['leverage-executive', 'room-read', 'list-read', 'lotte-cafe', 'lotte-last', 'photos-back', 'wake-window', 'toast-leave', 'key-ring', 'board-leave', 'spare-keep']);
  expect([s.choices['own.crossover'], s.choices['c8.entered'], s.choices['route.lane']]).toEqual(['executive', 'executive', 'own-power']);
  expect(text(s)).toContain('someone opened a door for you');
  expect(text(s)).toContain('Except I did not stand entirely alone this time, and I know it.');
});

it('opens every road as a scene with its own place and choice, each recorded, all reaching the same turn', () => {
  const julian = { 'c4.audit-paid': '900', 'c4.julian-kept': 'yes', 'c3.helix-window': 'offered', 'c4.method': undefined, 'c4.personal-withdrawn': undefined };
  const cases: [Record<string, string | undefined>, string, [string, string], string, string, string][] = [
    [{ 'c5.published': 'yes' }, 'leverage-audience', ['gala-dance', 'gala-carpet'], 'c8.gala', 'Harbour winter gala', 'Tobias Keel'],
    [{ 'own.alliance.rook': 'owed' }, 'leverage-rook', ['debt-true', 'debt-false'], 'c8.rook-report', 'Axiom Tower lobby', 'you tell me'],
    [{ 'c5.editor-contact': 'yes' }, 'leverage-editor', ['press-run', 'press-hold'], 'c8.press', 'Aster Review', 'Clara Duvall'],
    [{ 'c6.maya': 'restored' }, 'leverage-maya', ['maya-away', 'maya-close'], 'own.maya-distance', 'counter near Compliance', 'the one in the magazine'],
    [julian, 'leverage-executive', ['room-photo', 'room-read'], 'c8.room', 'contracts room', 'You are not here for me'],
    [{ 'own.exposed': 'yes' }, 'leverage-institutional', ['car-ask', 'car-watch'], 'c8.sloane', 'Sloane’s car', 'I am not the top of this'],
    [{}, 'leverage-refuse-cross', ['dig-watch', 'dig-leave'], 'c8.dig-rival', 'night terminal', 'Meridian Holdings'],
  ];
  for (const [flags, road, picks, key, place, line] of cases) {
    const scene = c8(leverage(flags), road);
    expect(ids(scene), road).toEqual(picks);
    expect(currentPlace(scene, 'x'), road).toContain(place);
    expect(text(scene), road).toContain(line);
    for (const pick of picks) {
      const over = c8(scene, pick);
      expect([over.phase, over.choices[key]], pick).toEqual(['advance', expect.any(String)]);
      expect(over.choices['c8.leverage-open'], pick).toBeUndefined();
      expect(text(over), pick).toContain('halfway down the page, in the same plain type, is Helix'.replace('halfway', 'Halfway'));
    }
  }
});

it('shows the intrusion to everyone and a line from a partner she already chose', () => {
  const plain = c8(withFlags(complete7('own-records-stop'), { 'c7.evening-outcome': undefined }), 'begin');
  expect(text(plain)).toContain('a cigarette nobody in this building smokes');
  const julianNight = c8(withFlags(complete7('own-records-stop'), { 'c7.evening': 'julian', 'c7.evening-outcome': 'intimate-sex' }), 'begin');
  expect(text(julianNight)).toContain('Still thinking about the window.');
  const sebNight = c8(withFlags(complete7('own-records-stop'), { 'c7.evening': 'sebastian', 'c7.evening-outcome': 'intimate-no-sex' }), 'begin');
  expect(text(sebNight)).toContain('the second of Sebastian’s four cities');
  const declined = c8(withFlags(complete7('own-records-stop'), { 'c7.evening': 'julian', 'c7.evening-outcome': 'declined' }), 'begin');
  expect(text(declined)).not.toContain('Still thinking about the window.');
});

// ── Deepening pass 2: the cost, played ──

it('plays the break-in and the week’s money before the wall, each with a real cost', () => {
  const home = c8(withFlags(complete7('own-records-stop'), { 'own.cash': '200', 'own.campaign': undefined }), 'begin');
  expect(ids(home)).toEqual(['breakin-locks', 'breakin-trap', 'breakin-report']);
  // The neighbour comes between the break-in and the week.
  const locked = c8(c8(home, 'breakin-locks'), 'neighbour-thank');
  expect([locked.choices['c8.breakin'], locked.choices['own.cash']]).toEqual(['locks', '140']);
  expect(text(locked)).toContain('Somebody opened it with a key.');
  expect(text(locked)).toContain('Meridian Holdings, behind the building');
  expect(text(locked)).toContain('The week comes to $90');
  expect(ids(locked)).toEqual(['money-pay', 'money-sell', 'money-owing']);
  expect(c8(locked, 'money-pay').choices['own.cash']).toBe('50');
  const sold = c8(locked, 'money-sell');
  expect([sold.choices['c8.money'], sold.choices['own.cash']]).toEqual(['sell', '450']);
  expect(text(sold)).toContain('She had beautiful taste');
  expect(c8(locked, 'money-owing').choices['own.cash']).toBe('140');
  expect(ids(c8(locked, 'money-owing'))).toEqual(['work-give', 'work-hold']);
  const reported = c8(home, 'breakin-report');
  expect(text(reported)).toContain('Meridian’s agent, the company that exists to have no face');
  const advance = c8(c8(withFlags(home, { 'own.campaign': 'taken' }), 'breakin-trap'), 'neighbour-thank');
  expect(ids(advance)).toContain('money-advance');
  const fed = c8(advance, 'money-advance');
  expect([fed.choices['own.cash'], fed.choices['own.odile']]).toEqual(['410', 'owed']);
});

it('makes the client list a choice: reading every line finds her returned to inventory', () => {
  const atList = walk(leverage(), ['leverage-refuse-cross', 'dig-leave']);
  expect(ids(atList)).toEqual(['list-read', 'list-copy']);
  const read = c8(atList, 'list-read');
  // The next day belongs to Lotte (Emerald Hill) before the night.
  expect([read.phase, read.choices['c8.lotte-open']]).toEqual(['emerald', 'invite']);
  expect(text(read)).toContain('VALE, E. · SINGAPORE · RETURNED TO INVENTORY · REISSUED');
  const copied = c8(atList, 'list-copy');
  expect(text(copied)).not.toContain('RETURNED TO INVENTORY');
  expect(copied.choices['c8.list']).toBe('copied');
});

it('answers the break-in on the night after: the trap shows who came back', () => {
  const trapped = walk(c8(withFlags(complete7('own-records-stop'), clean), 'begin'), ['breakin-trap', 'money-owing', 'cost-continue', 'leverage-refuse-cross', 'dig-leave', 'list-read', 'lotte-cafe', 'lotte-last', 'photos-back', 'wake-window', 'toast-leave', 'key-ring', 'board-leave', 'spare-keep']);
  expect(text(trapped)).toContain('one print: narrow, a good shoe, a woman’s size, pointing in');
  expect(text(trapped)).toContain('The invoices are still in the drawer.');
});

it('remembers the sold gown on the night after', () => {
  const sold = walk(c8(withFlags(complete7('own-records-stop'), clean), 'begin'), ['breakin-report', 'money-sell', 'cost-continue', 'leverage-refuse-cross', 'dig-leave', 'list-copy', 'lotte-cafe', 'lotte-last', 'photos-back', 'wake-window', 'toast-leave', 'key-ring', 'board-leave', 'spare-keep']);
  expect(text(sold)).toContain('There is a gap in the wardrobe where the gown hung.');
});

it('lets Theo send the morning-after line only if she chose his night', () => {
  const night = { 'c7.evening': 'theo', 'c7.evening-outcome': 'intimate-sex' };
  expect(text(c8(withFlags(complete7('own-records-stop'), night), 'begin'))).toContain('The pad was blank, by the way.');
  expect(text(c8(withFlags(complete7('own-records-stop'), { ...night, 'c7.evening-outcome': 'declined' }), 'begin'))).not.toContain('The pad was blank');
});

it('walks the break-in room by room, and gives the night after a moment of its own', () => {
  const home = c8(complete7('own-records-stop'), 'begin');
  expect(text(home)).toContain('every one of them facing the same way');
  expect(text(c8(home, 'breakin-locks'))).toContain('Keys are for people who ask first.');
  const close = walk(leverage(), ['leverage-refuse-cross', 'dig-leave', 'list-read', 'lotte-cafe', 'lotte-last', 'photos-back', 'wake-window', 'toast-leave', 'key-ring', 'board-leave', 'spare-keep']);
  expect(text(close)).toContain('One says only CLOSED');
  expect(close.phase).toBe('close');
  const walked = c8(close, 'night-walk');
  expect([walked.phase, walked.choices['c8.night']]).toEqual(['call', 'walk']);
  expect(text(walked)).toContain('It made me. It can see what it made.');
  expect(ids(walked)).toEqual(['call-evie', 'call-ask', 'call-down']);
  expect(c8(walked, 'close-end').phase).toBe('complete');
});

it('plays the working week: the shoot where Laurent’s money watches, or the desk; then the bank', () => {
  const home = c8(withFlags(complete7('own-records-stop'), clean), 'begin');
  const desk = walk(home, ['breakin-report', 'money-owing']);
  expect(text(desk)).toContain('Pell & Rourke');
  expect(text(desk)).toContain('Our biggest client is a fund on the river.');
  const held = choose8(desk, 'work-hold');
  expect([held.choices['c8.work'], held.choices['c8.work-kind']]).toEqual(['hold', 'desk']);
  expect(text(held)).toContain('It is a sub-account, under a corporate relationship');
  expect(text(held)).toContain('the same agent that stands in front of Meridian Holdings');
  expect(ids(held)).toEqual(['bank-cash', 'bank-new', 'bank-leave']);
  const cash = choose8(held, 'bank-cash');
  expect([cash.choices['c8.bank'], cash.choices['own.cash']]).toEqual(['cash', held.choices['own.cash']]);
  // Maintenance comes on Thursday, after the bank.
  expect(ids(cash)).toEqual(['pryce-in', 'pryce-chain', 'pryce-away']);

  const shoot = walk(c8(withFlags(complete7('own-records-stop'), { ...clean, 'own.campaign': 'terms' }), 'begin'), ['breakin-report', 'money-owing']);
  expect(text(shoot)).toContain('Madame Laurent’s office.');
  expect(text(shoot)).toContain('Just one frame with the face.');
  const gave = choose8(shoot, 'work-give');
  expect(gave.choices['c8.work-kind']).toBe('shoot');
  expect(text(choose8(shoot, 'work-hold'))).toContain('It makes them curious.');
});

it('has the neighbour meet her friend with a key, and a reporter at the door if her face is public', () => {
  const home = c8(withFlags(complete7('own-records-stop'), clean), 'begin');
  const landing = choose8(home, 'breakin-report');
  expect(text(landing)).toContain('she said she knew, she had a key');
  expect(ids(landing)).toEqual(['neighbour-ask', 'neighbour-warn', 'neighbour-thank']);
  const asked = choose8(landing, 'neighbour-ask');
  expect([asked.choices['c8.neighbour'], asked.facts.includes('c8.friend')]).toEqual(['ask', true]);
  expect(text(asked)).toContain('Hair very short, like a boy’s');
  expect(text(asked)).toContain('The week comes to $90');

  const quiet = walk(leverage(), ['leverage-refuse-cross', 'dig-leave', 'list-read', 'lotte-cafe', 'lotte-last', 'photos-back', 'wake-window', 'toast-leave', 'key-ring', 'board-leave', 'spare-keep']);
  expect(ids(quiet)).toEqual(['night-watch', 'night-walk', 'night-sleep']);
  const famous = walk(leverage({ 'c5.published': 'yes' }), ['leverage-refuse-cross', 'dig-leave', 'list-read', 'lotte-cafe', 'lotte-last', 'photos-back', 'wake-window', 'toast-leave', 'key-ring', 'board-leave', 'spare-keep']);
  expect(text(famous)).toContain('Rafe Collis, the Sunday Courier.');
  expect(ids(famous)).toEqual(['hack-line', 'hack-meridian', 'hack-door']);
  const set = choose8(famous, 'hack-meridian');
  expect([set.phase, set.choices['c8.hack']]).toEqual(['close', 'meridian']);
  expect(ids(set)).toEqual(['night-watch', 'night-walk', 'night-sleep']);
});

it('sends her after Bishop onto the fire escape, and answers the landline at three', () => {
  const home = c8(withFlags(complete7('own-records-stop'), clean), 'begin');
  const escape = walk(home, ['breakin-report', 'neighbour-thank', 'money-owing', 'work-hold', 'bank-leave', 'pryce-chain', 'talk-owner']);
  expect(text(escape)).toContain('and see the binoculars');
  expect(ids(escape)).toEqual(['bishop-stare', 'bishop-photo', 'bishop-cat']);
  const photo = choose8(escape, 'bishop-photo');
  expect([photo.choices['c8.bishop'], photo.facts.includes('c8.binoculars')]).toEqual(['photo', true]);
  expect(ids(photo)).toEqual(['cost-continue']);

  const night = walk(leverage(), ['leverage-refuse-cross', 'dig-leave', 'list-read', 'night-sleep']);
  expect(text(night)).toContain('It’s Mrs Tan. From the building on Emerald Hill.');
  expect(ids(night)).toEqual(['call-evie', 'call-ask', 'call-down']);
  const asked = choose8(night, 'call-ask');
  expect([asked.choices['c8.call'], asked.facts.includes('c8.emerald-hill')]).toEqual(['ask', true]);
  expect(text(asked)).toContain('She took one orchid for herself. The white one.');
  expect(ids(asked)).toEqual(['close-end']);
});

it('plays Emerald Hill: Lotte, nine photographs, a question and what she takes', () => {
  const atList = walk(leverage(), ['leverage-refuse-cross', 'dig-leave']);
  const denied = choose8(atList, 'list-read');
  expect(text(denied)).toContain('I don’t need you to tell me who you are.');
  expect(ids(denied)).toEqual(['lotte-cafe', 'lotte-home']);
  const known = choose8(withFlags(atList, { 'c7.lotte': 'ask' }), 'list-read');
  expect(text(known)).toContain('You never took anything when you left.');

  const home = choose8(known, 'lotte-home');
  expect(currentPlace(home, 'x')).toContain('Lotte’s flat');
  expect(text(home)).toContain('You got me into them. I never forgave you.');
  expect(text(home)).toContain('whose hair is cropped close, whose hand rests on the back of her neck');
  expect(ids(home)).toEqual(['lotte-work', 'lotte-c', 'lotte-last']);
  const c = choose8(home, 'lotte-c');
  expect(text(c)).toContain('She’s my employer, my landlady and my conscience, Lotte. Pick one.');
  expect(ids(c)).toEqual(['photos-all', 'photos-one', 'photos-back']);
  const all = choose8(c, 'photos-all');
  expect([all.phase, all.choices['c8.photos'], all.choices['c8.lotte-open'], all.facts.includes('c8.photos')]).toEqual(['wake', 'all', undefined, true]);
  expect(text(choose8(c, 'photos-back'))).toContain('a test she did not know she was setting');
});

it('plays the Wake: the notice on the tram, the Anchor, how she knew him, and the toast', () => {
  const atList = walk(leverage({ 'c6.maya': 'restored', 'c6.maya-knows': 'in-person' }), ['leverage-refuse-cross', 'dig-leave', 'list-read', 'lotte-cafe', 'lotte-last']);
  const notice = choose8(atList, 'photos-one');
  expect(text(notice)).toContain('VALE, Adrian. Colleagues and friends will raise a glass in his memory tonight');
  expect(ids(notice)).toEqual(['wake-stranger', 'wake-friend', 'wake-window']);
  const friend = choose8(notice, 'wake-friend');
  expect(currentPlace(friend, 'x')).toContain('The Anchor');
  expect(text(friend)).toContain('drinking red wine out of a chipped mug. His mug.');
  expect(text(friend)).toContain('she lifts the mug to you across the room');
  expect(ids(friend)).toEqual(['knew-close', 'knew-work', 'knew-nothing']);
  const close = choose8(friend, 'knew-close');
  expect(text(close)).toContain('He never said anything, did he.');
  expect(text(close)).toContain('He fixed my reports for six years and never told anyone.');
  const spoke = choose8(close, 'toast-speak');
  expect([spoke.phase, spoke.choices['c8.wake'], spoke.choices['c8.knew'], spoke.choices['c8.toast'], spoke.choices['c8.wake-open']]).toEqual(['number14', 'friend', 'close', 'speak', undefined]);
  expect(text(spoke)).toContain('Even my wake has a watcher.');

  const outside = choose8(notice, 'wake-window');
  expect(ids(outside)).toEqual(['toast-drink', 'toast-speak', 'toast-leave']);
  expect(text(choose8(outside, 'toast-speak'))).toContain('your breath fogs the window over his photograph');
});

it('takes Adrian’s spare key back to Number 14, where even his hiding place has been serviced', () => {
  const atList = walk(leverage(), ['leverage-refuse-cross', 'dig-leave', 'list-read', 'lotte-cafe', 'lotte-last', 'photos-back', 'wake-window']);
  const street = choose8(atList, 'toast-leave');
  expect(text(street)).toContain('It is still his key. It is not still his door.');
  expect(ids(street)).toEqual(['key-ring', 'key-in', 'key-post']);
  // The restructuring pass: Number 14 is a phase of its own, its place the scene header's.
  expect(street.phase).toBe('number14');

  const posted = choose8(street, 'key-post');
  expect([posted.phase, posted.choices['c8.key'], posted.choices['c8.key-open']]).toEqual(['close', 'post', undefined]);

  const rang = choose8(street, 'key-ring');
  expect(text(rang)).toContain('Even his hiding place has been serviced.');
  expect(ids(rang)).toEqual(['board-open', 'board-leave']);
  const opened = choose8(rang, 'board-open');
  expect([opened.choices['c8.board'], opened.facts.includes('c8.hiding-place')]).toEqual(['open', true]);
  expect(text(opened)).toContain('A man came to look at the skirting boards.');
  expect(ids(opened)).toEqual(['spare-keep', 'spare-kemi', 'spare-river']);
  const gave = choose8(opened, 'spare-kemi');
  expect([gave.phase, gave.choices['c8.spare'], gave.choices['c8.key-open']]).toEqual(['close', 'kemi', undefined]);
  expect(text(gave)).toContain('Change the lock.');

  const broke = choose8(choose8(street, 'key-in'), 'board-leave');
  expect(text(broke)).toContain('This is what they did to me. Now I am doing it to her.');
  expect(text(choose8(broke, 'spare-kemi'))).toContain('CHANGE YOUR LOCK. Unsigned.');
});

it('sends Mr Pryce to service her boiler on Thursday, and she knows him at the binoculars on Saturday', () => {
  const home = c8(withFlags(complete7('own-records-stop'), clean), 'begin');
  const door = walk(home, ['breakin-report', 'neighbour-thank', 'money-owing', 'work-hold', 'bank-leave']);
  expect(door.phase).toBe('maintenance');
  expect(text(door)).toContain('Pryce, Ms Vale. From the agents.');
  expect(ids(door)).toEqual(['pryce-in', 'pryce-chain', 'pryce-away']);
  const inside = choose8(door, 'pryce-in');
  expect(ids(inside)).toEqual(['talk-owner', 'talk-window', 'talk-tea']);
  const tea = choose8(inside, 'talk-tea');
  expect([tea.phase, tea.choices['c8.pryce'], tea.choices['c8.pryce-talk']]).toEqual(['fireescape', 'in', 'tea']);
  expect(text(tea)).toContain('You learn not to have anything.');
  expect(text(tea)).toContain('It is Mr Pryce. He has taken off the grey coat.');
  const away = choose8(door, 'pryce-away');
  expect([away.phase, away.choices['c8.pryce']]).toEqual(['fireescape', 'away']);
  expect(text(away)).toContain('For as long as it is.');
});
