/** Chapter 8 (own-power) · The Cost Bites: cost → leverage (one crossover decision) → advance → close.
 * Additive in revision 19 after Chapter 7's own-power ending, gated behind chapter8Playable(). Wording and flags:
 * docs/story/scripts/CHAPTER_8_OWN_POWER_SCRIPT.md with its Phase 0 decisions. own.crossover changes access,
 * never route.lane. No intimacy in this chapter. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';
import { get5, julian5 } from './chapter5-model';
import { get6 } from './chapter6-model';
import { getKey, setKey } from './chapter7-model';

export type C8Scene = { title: string; place: string; blocks: Block[] };
export type C8Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
export const get8 = (s: GameState, k: string) => s.choices['c8.' + k];
export const set8 = (s: GameState, k: string, v = 'yes') => {
  s.choices['c8.' + k] = v;
};
const offer8 = (id: string, label: string, hint: string, next: string, apply?: C8Choice['apply']): C8Choice => ({
  id: 'chapter8.' + id,
  label,
  hint,
  next,
  apply,
});
export const chapter8Playable = (s: GameState) =>
  (s.contentRevision ?? 0) >= 19 && import.meta.env.VITE_EVE_CHAPTER8 === '1';

function note8(s: GameState, key: string, text: string, source: string) {
  if (get8(s, 'rec.' + key) !== undefined) return;
  set8(s, 'rec.' + key, String(s.history.length));
  set8(s, 'event.' + key, String(s.revision));
  set8(s, 'layer.' + key, 'fact');
  s.history.push({
    node: `${s.scene}.${s.phase}` as NodeId,
    blocks: [
      { kind: 'notice', text },
      { kind: 'notice', text: 'Source: ' + source },
    ],
  });
  s.facts.push('c8.' + key);
  s.knowledge.push('c8.' + key);
}

export const DIG_COST = 120;
const LOW_CASH = 100;
const cash = (s: GameState) => Number(getKey(s, 'own.cash') ?? 0);
const SENDER = 'Unknown sender';

export const chapter8Definitions: Record<string, C8Scene> = {
  cost: { title: 'The Cost Bites', place: 'DAYS LATER · ON YOUR OWN', blocks: [] },
  leverage: { title: 'Over the Wall', place: '· THE CHOICE', blocks: [] },
  advance: { title: 'What It Was Hiding', place: '· THE SHAPE', blocks: [] },
  close: { title: 'Whose Door', place: '· THAT NIGHT', blocks: [] },
  complete: { title: 'The Next Room', place: '· LATER', blocks: [] },
};
export const chapter8Scenes = Object.entries(chapter8Definitions).map(([phase, scene]) => ({
  id: `chapter8.${phase}` as NodeId,
  ...scene,
}));

// ── Blocks ──

function costBlocks(s: GameState): Block[] {
  const low = cash(s) < LOW_CASH;
  // Meridian is named here only if she found it herself in Chapter 7; advance names it for everyone.
  const frame = getKey(s, 'own.piece.records')
    ? `The thread from last week points somewhere you cannot follow on foot. The authorization sits above Sloane, at Meridian and whoever sits on its board — and Meridian is a closed shell with no public face and no door you can pay to open. ${low ? 'You count your money again and it counts back shorter than it did.' : 'You have a little runway left, and a wall in front of it.'}`
    : 'The thread from last week points up, past Sloane, to something you cannot name yet — a signature you never found, an authority above the woman you’ve been fearing. You know it is there. You do not know what it is called. That is the wall.';
  return [
    p(frame),
    t('This is the part they meant when they said independence was expensive. Not the money, or not only. It is that some rooms will not open for someone with no institution behind her, and you chose to be someone with no institution behind her.'),
    ...(getKey(s, 'own.exposed')
      ? [
          p('The message is not from an account that deletes itself. It is from Sloane, on the record, unhurried.'),
          q('Sloane', 'You have been asking who authorized reusing her. I know, because you asked it where I could hear. I am not going to tell you to stop. I am going to tell you that you are about to walk into something with no cover, and that I could give you cover, and that you should think hard about why I would offer.'),
          t('Help, or a leash held out as help. From what you found last week, Sloane may be as much inside this as you are — which makes the offer either the truest thing anyone has said to you, or the most useful lie. You cannot yet tell. That is the trap of it.'),
        ]
      : [p('No one has noticed you yet. That is its own kind of alone — no help offered, because no one knows to offer it. The wall is still there, and it is yours to get over quietly.')]),
  ];
}

function advanceBlocks(s: GameState): Block[] {
  const crossed = (getKey(s, 'own.crossover') ?? 'none') !== 'none';
  const allyPaid = getKey(s, 'own.alliance.rook') === 'spent' || getKey(s, 'own.alliance.editor') === 'spent';
  return [
    p('However you got over it, the same shape is on the other side, and it is bigger than you feared and smaller than you hoped. Meridian Holdings is not Helix. It is not Axiom. It is a private concern that builds operations — identities, legends, whole manufactured people — and sells them to whoever can pay. Project Eve is a product. Axiom is a client. Sloane is a client’s officer.'),
    t('You were never Axiom’s asset, or Sloane’s. You are Meridian’s product, sold on. The person who authorized reusing her authorized it as a vendor reusing stock. That is the coldest thing you have learned yet, and you learned it yourself.'),
    p(
      crossed
        ? 'You know it because someone opened a door for you. You will not forget who, or that you needed them to.'
        : 'You know it because you would not let anyone open the door for you. It cost you, and no one can take it back or hold it over you.',
    ),
    ...(allyPaid ? [p('And it cost the ally, too — a marker called, a patience spent. Help is not free either; you only chose which kind of not-free.')] : []),
  ];
}

function closeBlocks(s: GameState): Block[] {
  const crossed = (getKey(s, 'own.crossover') ?? 'none') !== 'none';
  return [
    p('You have the shape now: a private maker of people, a board above Sloane, one name on it you are almost sure you have met. What you do not have is the name, or the why, or a single institution you can trust to hold any of this but yourself.'),
    t(
      `Standing alone got you here — to a truth an institution would have buried, held by no one but you.${crossed ? ' Except you did not stand entirely alone this time, and you know it.' : ''} The next room is the one with the name in it, and you will decide then whose door you walk through to reach it.`,
    ),
  ];
}

export function chapter8Blocks(s: GameState): Block[] {
  if (s.scene !== 'chapter8') return [];
  if (s.phase === 'cost') return costBlocks(s);
  if (s.phase === 'advance') return advanceBlocks(s);
  if (s.phase === 'close') return closeBlocks(s);
  return [];
}

// ── The crossover decision ──

function over(x: GameState, entered: string, crossover: 'none' | 'executive' | 'institutional') {
  setKey(x, 'own.crossover', crossover);
  set8(x, 'entered', entered);
}

/** One ally, by priority: the sender's debt, then the editor she met, then Maya within her public scope. */
function ally(s: GameState): 'rook' | 'editor' | 'maya' | undefined {
  if (getKey(s, 'own.alliance.rook') === 'owed') return 'rook';
  if (get5(s, 'editor-contact')) return 'editor';
  if (get6(s, 'maya') === 'restored') return 'maya';
  return undefined;
}

function leverageChoices(s: GameState): C8Choice[] {
  const c: C8Choice[] = [];
  if (get5(s, 'published'))
    c.push(
      offer8('leverage-audience', 'Smoke them out in public', 'Aim your visibility at a closed door. It opens a crack — and you are more seen than ever.', 'advance', (x) => {
        over(x, 'audience', 'none');
        setKey(x, 'own.exposed', 'yes-deep');
        x.npcs.sloane.known.push({ key: 'The independent one has made Meridian a public question.', source: 'Evelynn’s public questions about a closed company', event: x.revision });
        return [p('You make Meridian a question your readers start asking too — not an accusation, a curiosity, the kind that makes a quiet company’s silence look like an answer. A closed shell hates being looked at. Someone connected to it moves, and the movement tells you something.')];
      }),
    );
  const who = ally(s);
  if (who === 'rook')
    c.push(
      offer8('leverage-rook', 'Spend an ally · call the debt with the sender', 'Call in the help you’ve actually earned. It costs the ally something.', 'advance', (x) => {
        over(x, 'rook', 'none');
        setKey(x, 'own.alliance.rook', 'spent');
        note8(x, 'rook-debt', 'Evelynn called the sender’s marker; the debt is settled with one document from Meridian’s offshore board. Unreliable, but concrete.', 'The sender, collecting in kind');
        return [q(SENDER, 'You owe me one and I collect in kind. Here: Meridian’s registered board meets offshore, and I can put one document in your hands. Read it fast; I was never here.')];
      }),
    );
  if (who === 'editor')
    c.push(
      offer8('leverage-editor', 'Spend an ally · put a reporter on it', 'Call in the help you’ve actually earned. It costs the ally something.', 'advance', (x) => {
        over(x, 'editor', 'none');
        setKey(x, 'own.alliance.editor', 'spent');
        return [
          p('You put a real reporter on it — a contact with the patience for a corporate veil and the standing to file for what’s sealed. It takes days you’d rather not spend, and comes back clean and sourced: the shell peeled one layer, a real counterparty underneath.'),
          q('Editor', 'It’s a strange little company you’ve found. It doesn’t sell anything you can buy. Give me a week and I’ll tell you who it sells to.'),
        ];
      }),
    );
  if (who === 'maya')
    c.push(
      offer8('leverage-maya', 'Spend an ally · ask Maya what she can say', 'Call in the help you’ve actually earned. It costs the ally something.', 'advance', (x) => {
        over(x, 'maya', 'none');
        setKey(x, 'own.alliance.maya', 'used');
        return [
          q('Maya', 'I can’t touch it, but I can tell you what it isn’t. No public products, an offshore board — that’s not a government arm and not a normal corporate subsidiary. It’s a private contractor. Someone builds things and sells them quietly. That’s as far as I go.'),
          p('She’s narrowed the category without breaching her line: private, contracted, deniable. Enough to know what you’re looking at.'),
        ];
      }),
    );
  if (julian5(s))
    c.push(
      offer8('leverage-executive', 'Take Julian’s access, once', 'He can get you into a Helix room where Meridian’s shape is visible. It works. It also puts you back inside a door someone else holds.', 'advance', (x) => {
        over(x, 'executive', 'executive');
        note8(x, 'crossover', 'Evelynn re-entered a provider’s door once: Julian’s access to a Helix room. Her road is unchanged; her standing paid for it.', 'Julian’s access, taken by choice');
        return [p('Julian does not ask why. He gets you an hour in a room you could never have entered alone, where the contracts on the wall name their counterparties, and one of them is Meridian. It works exactly the way access always works — easily, and on someone else’s sufferance.')];
      }),
    );
  if (getKey(s, 'own.exposed'))
    c.push(
      offer8('leverage-institutional', 'Accept Sloane’s cover', 'She’ll show you who’s above her. Believe her at your peril.', 'advance', (x) => {
        over(x, 'institutional', 'institutional');
        note8(x, 'crossover', 'Evelynn accepted Sloane’s cover to see Meridian’s board. The dependency is recorded; Sloane’s motive is not.', 'Sloane’s offer, taken by choice');
        return [p('You take the cover. Sloane is as good as her word and that is the frightening part: she shows you the board, or enough of it, and she does not flinch at what it means for her. Either she is genuinely as trapped as you, or she is walking you exactly where she wants you.')];
      }),
    );
  c.push(
    offer8('leverage-refuse-cross', 'Refuse the shortcut; find the hard way', 'No borrowed doors. It costs you more and it stays yours.', 'advance', (x) => {
      over(x, 'dig', 'none');
      // Never blocked: short of the cost, the dig is recorded unpaid and cash clamps at 0.
      const before = cash(x);
      set8(x, 'dig-fee', before >= DIG_COST ? 'paid' : 'unpaid');
      setKey(x, 'own.cash', String(Math.max(0, before - DIG_COST)));
      note8(x, 'dig', before >= DIG_COST ? `Spent $${DIG_COST} on the slow self-funded dig. Own cash: $${before - DIG_COST}.` : `The $${DIG_COST} dig is unpaid; own cash was $${before}.`, 'Filings, fees and time, paid by Evelynn');
      return [p('You do not take the easy door. You do it the long way — more money, more time, more risk of the wall simply winning — because the whole point of you, now, is that no one gets to hold the door you walk through. It is harder. It is also the only version of this you can live in.')];
    }),
  );
  return c;
}

export function chapter8Choices(s: GameState): C8Choice[] {
  if (!chapter8Playable(s)) return [];
  if (s.scene === 'chapter7' && s.phase === 'complete' && getKey(s, 'route.lane') === 'own-power')
    return [offer8('begin', 'Go on', 'Days later. The wall is still there.', 'cost')];
  if (s.scene !== 'chapter8') return [];
  if (s.phase === 'cost') return [offer8('cost-continue', 'Look for a way over the wall', 'Every way costs something.', 'leverage')];
  if (s.phase === 'leverage') return leverageChoices(s);
  if (s.phase === 'advance') return [offer8('advance-continue', 'Take stock of what you have', 'The shape, and what it cost.', 'close')];
  if (s.phase === 'close') return [offer8('close-end', 'Carry it into the next room', 'Chapter 8 ends here.', 'complete')];
  return [];
}

export function applyChapter8Choice(state: GameState, id: string): GameState {
  const choice = chapter8Choices(state).find((c) => c.id === id);
  if (!choice) return state;
  const s = structuredClone(state);
  s.revision++;
  s.history.push({ node: `${state.scene}.${state.phase}` as NodeId, blocks: [{ kind: 'notice', text: 'Your choice: ' + choice.label }] });
  const blocks = choice.apply?.(s) ?? [];
  if (blocks.length) s.history.push({ node: `${state.scene}.${state.phase}` as NodeId, blocks });
  s.scene = 'chapter8';
  s.phase = choice.next;
  s.feedback = '';
  if (s.phase === 'advance' && state.phase !== 'advance') set8(s, 'meridian', 'product');
  if (state.scene !== s.scene || state.phase !== s.phase)
    s.history.push({ node: `chapter8.${s.phase}` as NodeId, blocks: chapter8Blocks(s) });
  s.ledger.push({ sequence: s.revision, action: { type: 'CHAPTER8_CHOOSE', id, expectedRevision: state.revision } });
  return s;
}
