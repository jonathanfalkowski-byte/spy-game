/** Chapter 9 (shared bridge) · Assembling the Case: arrive → assemble (hub) → resolve → complete.
 * Additive in revision 19 after a lane's Chapter 8 ending (own-power is the live feeder; the other lanes reach
 * arrive through the Chapter 7 in-development placeholder), gated behind chapter9Playable(). Wording and flags:
 * docs/story/scripts/CHAPTER_9_ASSEMBLING_THE_CASE_SCRIPT.md with the Phase 0 decisions in
 * docs/handoffs/2026-09-23-code-chapter9-assembling-the-case.md. case.strength derives at resolve from the
 * c9.took.* count; the name is never missable (the resolve floor). No intimacy in this chapter. */
import type { GameState } from '../state/schema';
import { paragraph as p, speech as q, thought as t, type Block, type NodeId } from './schema';
import { get5 } from './chapter5-model';
import { get6 } from './chapter6-model';
import { canCompare6 } from './chapter6-proof';
import { getKey, setKey } from './chapter7-model';

export type C9Scene = { title: string; place: string; blocks: Block[] };
export type C9Choice = { id: string; label: string; hint: string; next: string; apply?: (s: GameState) => Block[] };
export const get9 = (s: GameState, k: string) => s.choices['c9.' + k];
export const set9 = (s: GameState, k: string, v = 'yes') => {
  s.choices['c9.' + k] = v;
};
const offer9 = (id: string, label: string, hint: string, next: string, apply?: C9Choice['apply']): C9Choice => ({
  id: 'chapter9.' + id,
  label,
  hint,
  next,
  apply,
});
export const chapter9Playable = (s: GameState) =>
  (s.contentRevision ?? 0) >= 19 && import.meta.env.VITE_EVE_CHAPTER9 === '1';

function note9(s: GameState, key: string, text: string, source: string) {
  if (get9(s, 'rec.' + key) !== undefined) return;
  set9(s, 'rec.' + key, String(s.history.length));
  set9(s, 'event.' + key, String(s.revision));
  set9(s, 'layer.' + key, 'fact');
  s.history.push({
    node: `${s.scene}.${s.phase}` as NodeId,
    blocks: [
      { kind: 'notice', text },
      { kind: 'notice', text: 'Source: ' + source },
    ],
  });
  s.facts.push('c9.' + key);
  s.knowledge.push('c9.' + key);
}

export const ORACLE_FEE = 60;
const cash = (s: GameState) => Number(getKey(s, 'own.cash') ?? 0);
const ownPower = (s: GameState) => getKey(s, 'route.lane') === 'own-power';
const crossover = (s: GameState) => getKey(s, 'own.crossover');
const borrowedDoor = (s: GameState) => ['executive', 'institutional'].includes(crossover(s) ?? '');
const SENDER = 'Unknown sender';

// ── The strength budget: one weight per hub move taken, banded at resolve ──

export const weights9 = (s: GameState) => Object.keys(s.choices).filter((k) => k.startsWith('c9.took.')).length;
export const band9 = (n: number): 'thin' | 'supported' | 'strong' => (n >= 3 ? 'strong' : n === 2 ? 'supported' : 'thin');
const took = (s: GameState, move: string) => get9(s, 'took.' + move) !== undefined;
const take = (s: GameState, move: string) => set9(s, 'took.' + move);

// ── Gate predicates (Phase 0) ──

/** Celeste is the Ch6 corroborator when she confirmed the leaf; Marcus's Glass House memory is the fallback. */
export function witness9(s: GameState): 'celeste' | 'marcus' | undefined {
  if (get6(s, 'celeste') === 'let-be' || get6(s, 'celeste') === 'pressed') return 'celeste';
  if (!get6(s, 'celeste') && s.day.records.some((r) => r.key === 'mission.marcus-memory')) return 'marcus';
  return undefined;
}
export function lever9(s: GameState): 'oracle' | 'oracle-inferred' | undefined {
  if (get6(s, 'oracle-seen') === 'yes') return 'oracle';
  return get6(s, 'proof-opened') ? 'oracle-inferred' : undefined;
}
export const evidence9 = (s: GameState) => get6(s, 'photo-custody') === 'phone' || canCompare6(s);
export function allies9(s: GameState): ('rook' | 'editor' | 'maya' | 'crossover')[] {
  const out: ('rook' | 'editor' | 'maya' | 'crossover')[] = [];
  if (getKey(s, 'own.alliance.rook') === 'owed') out.push('rook');
  if (get5(s, 'editor-contact') && getKey(s, 'own.alliance.editor') !== 'spent') out.push('editor');
  if (get6(s, 'maya') === 'restored' && !getKey(s, 'own.alliance.maya')) out.push('maya');
  if (borrowedDoor(s)) out.push('crossover');
  return out;
}
/** How the name was reached, first match wins: the editor's filing, a borrowed door, the sender's page, else public. */
export function nameRoad9(s: GameState): 'editor' | 'crossover' | 'rook' | 'public' {
  if (getKey(s, 'own.alliance.editor') === 'spent') return 'editor';
  if (borrowedDoor(s)) return 'crossover';
  if (getKey(s, 'own.alliance.rook') === 'spent') return 'rook';
  return 'public';
}

export const chapter9Definitions: Record<string, C9Scene> = {
  arrive: { title: 'The Same Wall', place: 'THE NEXT MORNING', blocks: [] },
  assemble: { title: 'Assembling the Case', place: '· WHAT YOU HOLD', blocks: [] },
  resolve: { title: 'What You Can Carry', place: '· THE CASE', blocks: [] },
  complete: { title: 'The Room Ahead', place: '· THAT NIGHT', blocks: [] },
};
export const chapter9Scenes = Object.entries(chapter9Definitions).map(([phase, scene]) => ({
  id: `chapter9.${phase}` as NodeId,
  ...scene,
}));

// ── Blocks ──

function arriveBlocks(s: GameState): Block[] {
  const frame: Block[] = ownPower(s)
    ? [
        p('You came this far the hardest way — a desk you pay for, a phone that answers only to you, and a truth you pulled out of a closed shell with no clearance and no one’s permission. You know what Meridian is now: not a company that keeps secrets, a company that makes them — that builds people out of other people’s lives and sells them. You are one of its products. So is the woman whose name you wear.'),
        p(
          borrowedDoor(s)
            ? 'You did not do all of it alone, and you have not forgotten whose door you borrowed to get here.'
            : 'And you did it without borrowing a single door. Whatever you build next, no one gets to say they handed it to you.',
        ),
      ]
    : [p(`[Chapter 9 · ${getKey(s, 'route.lane') ?? 'unknown'} road into the bridge — in development] You arrive at the same wall the others do, carrying what your road gave you.`)];
  return [
    ...frame,
    p('Meridian Holdings. A private intelligence concern that manufactures operations — identities, legends, whole manufactured people — and sells them to whoever can pay. Project Eve is a product. Axiom is a client. Sloane is a client’s officer. And the authorization to reuse her legend — the real woman who lived it before you were fitted into it — was signed at Meridian’s board.'),
    t('You have the shape. What you do not have is a case — something sourced, something that holds when an institution tries to make it disappear — and you do not have the name. One person on that board you have already met, and did not expect. Before you can decide what to do, you find out who, and you build something you can carry into the room.'),
  ];
}

function resolveBlocks(s: GameState): Block[] {
  const blocks: Block[] = [];
  if (get9(s, 'name-road') === 'floor')
    blocks.push(t('You already have the last piece and have been refusing to say it: the face on the board is one you’ve met, and when you let yourself, you know it. Celeste.'));
  const strength = getKey(s, 'case.strength');
  blocks.push(
    p(
      strength === 'strong'
        ? 'It holds. A named board member who knew the original, a legend proven reused, a system that flagged the defect before it was sold. Not a rumor — a case, sourced three ways, that would survive someone trying to make it vanish. You can walk into the next room and put it on the table.'
        : strength === 'supported'
          ? 'It holds up, mostly. Enough to force a conversation, not yet enough to force a hand. You have the name and one clean corroboration; the rest you will have to argue.'
          : 'It is thin. A name you are sure of and not much you can prove around it. It is enough to walk in knowing who you are looking at. It is not enough to make them afraid. That, too, is a place you can start from — and it is entirely yours.',
    ),
  );
  const spent = ['rook', 'editor', 'maya', 'crossover'].some((a) => took(s, a));
  const seen = !!getKey(s, 'own.exposed') || get9(s, 'name-road') === 'public';
  blocks.push(
    p(
      [
        spent ? 'You are lighter an ally or two than you were; help was not free, and you chose which kind.' : '',
        seen ? 'You are more visible for having gone looking, and Meridian is a thing that looks back.' : '',
        'And you are still the only person holding what you assembled.',
      ]
        .filter(Boolean)
        .join(' '),
    ),
  );
  return blocks;
}

export function chapter9Blocks(s: GameState): Block[] {
  if (s.scene !== 'chapter9') return [];
  if (s.phase === 'arrive') return arriveBlocks(s);
  if (s.phase === 'assemble')
    return [p('You spread it all out and sort it: what is sourced, what is only argued, and the one name you still have to reach.')];
  if (s.phase === 'resolve') return resolveBlocks(s);
  if (s.phase === 'complete')
    return [t('You have the name, and a case the size of your road. You went looking for a face on that board and found one you had already met, which means she has already met yours. Celeste has seen your face too. She saw it first, across a room at the Glass House, and she smiled.')];
  return [];
}

// ── The hub ──

function witnessBlocks(s: GameState, who: 'celeste' | 'marcus'): Block[] {
  if (who === 'marcus')
    return [
      q('Marcus', 'She left the gathering before the speeches. I noticed because we were meant to close something that night, and we closed it without her. That’s what I can give you: where she was, and when she stopped being there. Not why.'),
      p('Professional memory, not friendship: a date, an absence, a deal that went on without her. It fits the record. It proves nothing about why.'),
    ];
  if (getKey(s, 'case.name'))
    return [
      q('Celeste', 'So you know. … That’s her. That’s the week she vanished. Now you know I knew her. Ask yourself why I’m still telling you the truth.'),
      p('She confirms it anyway, and it is the most frightening thing she has done. She is not afraid of what you hold. Not yet.'),
    ];
  if (get6(s, 'celeste') === 'pressed')
    return [
      q('Celeste', 'You pushed me once already. Fine. Show me the date.'),
      p('She reads it the way you’d check a bill. “That’s her. That’s the week she vanished.” She doesn’t touch your arm this time.'),
    ];
  return [
    q('Celeste', 'I knew her. Not the file of her — her, the way you know someone you had breakfast with. If you show me a date and a handoff and it matches the woman I knew, I’ll tell you it matches. I won’t tell you it was a crime, because I don’t know that it was. I’ll tell you it was her.'),
    p('She confirms the ledger leaf fits the person she knew — the date, the habit, the absence. No more than that; she is not pushed past it. It is firsthand, and it is clean.'),
  ];
}

function nameBlocks(s: GameState, road: ReturnType<typeof nameRoad9>): Block[] {
  return [
    p(
      `You go at the board itself.${ownPower(s) ? ' You use the one instrument you own — attention — to make Meridian’s silence expensive, and you read what moves when a closed thing is looked at.' : ''} ${
        road === 'public'
          ? 'It is slow, self-funded, and entirely yours.'
          : road === 'editor'
            ? 'The reporter’s filing names the board faster and cleaner than you could alone.'
            : road === 'rook'
              ? 'The sender’s offshore page names the board faster, if not cleaner.'
              : 'The door you borrowed shows you the board faster and cleaner than you could alone.'
      }`,
    ),
    p('And the name surfaces, and you go still. You know it. Not from a file — from a morning. A hand on your arm and “You disappeared before breakfast.” She was not greeting an old friend she mistook you for. She was reading the fit of a legend she had helped sign away.'),
    t('Celeste. The warmth was the appraisal. Someone who knew the woman you are wearing — knew her the way you know a person — sat on the board that spent her, and then touched your arm.'),
  ];
}

function assembleChoices(s: GameState): C9Choice[] {
  const c: C9Choice[] = [];
  const who = witness9(s);
  if (who && !took(s, 'witness'))
    c.push(
      offer9('assemble-witness', 'Take the corroborator as far as they’ll go', 'Firsthand, and only as far as they really know.', 'assemble', (x) => {
        take(x, 'witness');
        set9(x, 'witness', who === 'celeste' ? 'confirmed' : 'confirmed-pro');
        return witnessBlocks(x, who);
      }),
    );
  const lever = lever9(s);
  if (lever && !took(s, 'oracle'))
    c.push(
      offer9('assemble-oracle', 'Turn the prediction into a lever', 'The maker knew the product was defective. That’s the whole case.', 'assemble', (x) => {
        take(x, 'oracle');
        set9(x, 'lever', lever);
        const blocks = [
          p('You lay out what ORACLE scored before any of this began: that you would take the identity willingly, that Sloane could not truly hold you — and that they proceeded anyway. It is not a confession. It is worse: it is a specification. They sold Axiom a controllable asset their own system had already marked uncontrollable.'),
        ];
        if (lever === 'oracle') return blocks;
        blocks.push(p('You never saw the assessment itself, so you rebuild its shape from the edges — slower, and you can only argue it, not wave it. It still points the same way.'));
        // Own-power pays for the reconstruction; never blocked, short of the fee it is recorded unpaid.
        if (ownPower(x)) {
          const before = cash(x);
          set9(x, 'oracle-fee', before >= ORACLE_FEE ? 'paid' : 'unpaid');
          setKey(x, 'own.cash', String(Math.max(0, before - ORACLE_FEE)));
          note9(x, 'oracle-fee', before >= ORACLE_FEE ? `Spent $${ORACLE_FEE} reconstructing the ORACLE assessment. Own cash: $${before - ORACLE_FEE}.` : `The $${ORACLE_FEE} reconstruction is unpaid; own cash was $${before}.`, 'Records, fees and time, paid by Evelynn');
        }
        return blocks;
      }),
    );
  if (evidence9(s) && !took(s, 'evidence'))
    c.push(
      offer9('assemble-evidence', 'Corroborate the paper into a chain', 'Custody, dates, a handoff in her hand. Make it hold.', 'assemble', (x) => {
        take(x, 'evidence');
        set9(x, 'chain', 'built');
        return [p('You build the chain the way it has to be built to survive contact with a lawyer: the leaf’s dated handoff, the Blackglass Singapore location history you already hold, and the witness’s confirmation, three things captured independently that could not have fed each other. Agreement across all three is the closest thing to proof you can own.')];
      }),
    );
  const allies = allies9(s);
  if (allies.includes('rook') && !took(s, 'rook'))
    c.push(
      offer9('assemble-rook', 'Spend an ally · the sender, one more time', 'Concrete, unsourceable, fast. It costs the ally something.', 'assemble', (x) => {
        take(x, 'rook');
        setKey(x, 'own.alliance.rook', 'spent');
        set9(x, 'rook-piece', 'unverified');
        note9(x, 'rook-piece', 'The sender supplied one more document from Meridian’s offshore board. Concrete, unsourced, unverified.', 'The sender, collecting the debt in kind');
        return [q(SENDER, 'One more page from the offshore board, and then we are square. Do not ask me where it came from.')];
      }),
    );
  if (allies.includes('editor') && !took(s, 'editor'))
    c.push(
      offer9('assemble-editor', 'Spend an ally · the reporter’s filing', 'Slow, clean, filing-grade. It costs the ally something.', 'assemble', (x) => {
        take(x, 'editor');
        setKey(x, 'own.alliance.editor', 'spent');
        return [p('The reporter’s corporate-veil filing comes back: slow, clean, and filing-grade — another layer of the shell peeled, with a source attached to every line.')];
      }),
    );
  if (allies.includes('maya') && !took(s, 'maya'))
    c.push(
      offer9('assemble-maya-bounded', 'Spend an ally · what Maya can say', 'Public scope only: the category and the floor, never the answer.', 'assemble', (x) => {
        take(x, 'maya');
        setKey(x, 'own.alliance.maya', 'used');
        return [
          q('Maya', 'I can tell you what level signs something like that. Directorate, or a private contractor with a board. Not who. That’s as far as I go.'),
          p('The category and the floor, within her line: a sign-off at that height is a board decision, not an officer’s.'),
        ];
      }),
    );
  if (allies.includes('crossover') && !took(s, 'crossover'))
    c.push(
      offer9('assemble-crossover-contact', 'Use the borrowed door once more', 'It is still ajar. Each use costs more standing.', 'assemble', (x) => {
        take(x, 'crossover');
        set9(x, 'crossover', 'deepened');
        return [p('The door you borrowed to get over the wall is still ajar, and you use it again. It works. It also means you owe that door a little more than you did, and the people behind it know it.')];
      }),
    );
  if (!getKey(s, 'case.name'))
    c.push(
      offer9('assemble-name', 'Find the face on the board', 'One name, and you have already met it.', 'assemble', (x) => {
        const road = nameRoad9(x);
        take(x, 'name');
        setKey(x, 'case.name', 'celeste');
        set9(x, 'name-road', road);
        if (road === 'public' && ownPower(x) && !getKey(x, 'own.exposed')) setKey(x, 'own.exposed', 'yes');
        return nameBlocks(x, road);
      }),
    );
  c.push(offer9('assemble-stop', 'Move with what you have', 'You don’t have to find every piece to act.', 'resolve'));
  return c;
}

export function chapter9Choices(s: GameState): C9Choice[] {
  if (!chapter9Playable(s)) return [];
  if (s.scene === 'chapter8' && s.phase === 'complete' && ownPower(s))
    return [offer9('begin', 'Go on', 'The next morning. Go looking for the name.', 'arrive', (x) => (set9(x, 'entered', 'own-power'), []))];
  if (s.scene === 'chapter7' && s.phase === 'complete' && getKey(s, 'route.lane') && !ownPower(s))
    return [offer9('begin-placeholder', 'Go on to the bridge', 'This road’s middle chapters are in development.', 'arrive', (x) => (set9(x, 'entered', getKey(x, 'route.lane')!), []))];
  if (s.scene !== 'chapter9') return [];
  if (s.phase === 'arrive') return [offer9('arrive-begin', 'Assemble what you have', 'Every road left a different pile. Sort it into a case.', 'assemble')];
  if (s.phase === 'assemble') return assembleChoices(s);
  if (s.phase === 'resolve') return [offer9('resolve-end', 'Carry it into the next room', 'Chapter 9 ends here.', 'complete')];
  return [];
}

/** Entering resolve: the name floor, then the band. Both derive from stored state only. */
function enterResolve9(s: GameState) {
  if (!getKey(s, 'case.name')) {
    setKey(s, 'case.name', 'celeste');
    set9(s, 'name-road', 'floor');
  }
  setKey(s, 'case.strength', band9(weights9(s)));
}

export function applyChapter9Choice(state: GameState, id: string): GameState {
  const choice = chapter9Choices(state).find((c) => c.id === id);
  if (!choice) return state;
  const s = structuredClone(state);
  s.revision++;
  s.history.push({ node: `${state.scene}.${state.phase}` as NodeId, blocks: [{ kind: 'notice', text: 'Your choice: ' + choice.label }] });
  const blocks = choice.apply?.(s) ?? [];
  if (blocks.length) s.history.push({ node: `${state.scene}.${state.phase}` as NodeId, blocks });
  s.scene = 'chapter9';
  s.phase = choice.next;
  s.feedback = '';
  if (s.phase === 'resolve' && state.phase !== 'resolve') enterResolve9(s);
  if (state.scene !== s.scene || state.phase !== s.phase)
    s.history.push({ node: `chapter9.${s.phase}` as NodeId, blocks: chapter9Blocks(s) });
  s.ledger.push({ sequence: s.revision, action: { type: 'CHAPTER9_CHOOSE', id, expectedRevision: state.revision } });
  return s;
}
