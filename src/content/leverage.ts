/** The leverage board (Chapter 10 onward; docs/story/CHAPTER_10_SHE_KNOWS_DESIGN.md §5).
 * Derived, not stored: it reads the save and shows who holds what over Evelynn, and what she holds.
 * It adds no score. Chapter 10 contributes only Celeste's order record (c10.*). */
import type { GameState } from '../state/schema';
import { sloaneDoubts } from './sloane-standing';

export type LeverageStatus = 'open' | 'complied' | 'refused' | 'countered';
export type LeverageEntry = {
  holder: string;
  holds: string[];
  wants?: string;
  threat?: string;
  status: LeverageStatus;
  source: string;
};
export type LeverageAsset = { id: string; label: string; source: string };

const c = (s: GameState, k: string) => s.choices[k];

/** Available once Evelynn has built her wall (Chapter 10). */
export const leverageBoardOpen = (s: GameState) => c(s, 'c10.wall') === 'built';

const orderWants: Record<string, string> = {
  tape: 'The raw tape of your interview, uncut, from Theo Marr’s archive',
  workroom: 'The contract page you read on Julian Mercer’s wall',
  notes: 'Everything you found, on paper',
};

export function leverageBoard(s: GameState): { held: LeverageEntry[]; holds: LeverageAsset[] } {
  const held: LeverageEntry[] = [];
  const answer = c(s, 'c10.answer') as LeverageStatus | undefined;
  const target = c(s, 'c10.target');
  held.push({
    holder: 'Celeste Laurent',
    holds: ['Maya Reyes’s clearance', 'Adrian Vale’s name', 'The apartment (Meridian owns the building)'],
    ...(target
      ? {
          wants: orderWants[target] + (target === 'notes' && c(s, 'c7.notes') === 'maya' ? ', and the copy Maya holds' : ''),
          threat: 'Maya’s clearance renewal, in nine days',
        }
      : {}),
    status: answer === 'complied' || answer === 'refused' || answer === 'countered' ? answer : 'open',
    source: 'Breakfast, and the black phone with one contact',
  });
  held.push({
    holder: 'Victoria Sloane',
    holds: ['The breach audit, in her drawer', ...(sloaneDoubts(s) ? ['A guess at the Glass House she hasn’t forgotten'] : [])],
    status: 'open',
    source: 'Sloane, the night of the Glass House',
  });
  if (c(s, 'own.alliance.rook') === 'owed')
    held.push({ holder: 'The sender', holds: ['A debt, not yet called'], status: 'open', source: 'The ferry terminal' });
  if (c(s, 'own.odile') === 'owed')
    held.push({ holder: 'Odile Frayne', holds: ['An advance against the campaign', 'Your diary'], status: 'open', source: 'The week you couldn’t pay' });
  if (c(s, 'own.marcus') === 'owed')
    held.push({ holder: 'Marcus Chen', holds: ['A debt. He always collects.'], status: 'open', source: 'A hotel bar that closes at six' });

  const holds: LeverageAsset[] = [];
  const strength = c(s, 'case.strength');
  if (c(s, 'case.name'))
    holds.push({ id: 'case', label: `The case against Celeste${strength ? ` (${strength})` : ''}`, source: 'What you assembled' });
  if (c(s, 'c9.lever')) holds.push({ id: 'oracle', label: 'ORACLE’s verdict: the product was uncontrollable, and they sold it anyway', source: 'The prediction, turned into a lever' });
  if (c(s, 'c8.list') === 'read') holds.push({ id: 'inventory', label: 'VALE, E. · RETURNED TO INVENTORY · REISSUED', source: 'Meridian’s client list, read line by line' });
  if (c(s, 'c8.list') === 'copied') holds.push({ id: 'list', label: 'Meridian’s client list, copied three ways', source: 'The night you got over the wall' });
  if (c(s, 'c6.photo-custody') === 'phone') holds.push({ id: 'leaf', label: 'The ledger leaf, photographed and kept', source: 'Your own phone' });
  if (s.mission.capture?.owner === 'Evelyn' || s.mission.token === 'evelyn') holds.push({ id: 'glass-house', label: 'What you carried out of the Glass House yourself', source: 'The Glass House' });
  if (c(s, 'c10.poison')) holds.push({ id: 'poison', label: 'Two poisoned details, waiting to show you who she passes them to', source: 'The notes you rewrote' });
  return { held, holds };
}

/** The wall, as the chapter narrates building it: one line per card. */
export function wallLines(s: GameState): string[] {
  const { held, holds } = leverageBoard(s);
  return [
    ...held.map((e) => `${e.holder}: ${e.holds.join('; ')}.`),
    ...(holds.length ? ['And on the other side of the door, in your own hand: ' + holds.map((a) => a.label).join('; ') + '.'] : []),
  ];
}
