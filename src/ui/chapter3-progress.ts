import type { GameState } from '../state/schema';
const groups: Record<string, [number, string]> = {
  morningPlan: [3, 'If I do nothing'],
  voss: [3, 'If I do nothing'],
  vossPlan: [3, 'If I do nothing'],
  rook: [4, 'A date to verify'],
  rookCompare: [4, 'A date to verify'],
  rookReply: [4, 'A date to verify'],
  informationEnd: [4, 'A date to verify'],
  invitation: [5, 'The invitation'],
  verifyOffer: [6, 'Verify the offer'],
  executive: [7, 'Julian Mercer'],
  executiveWork: [7, 'Julian Mercer'],
  reception: [8, 'The price of being seen'],
  photograph: [8, 'The price of being seen'],
  opportunityEnd: [8, 'After the offer'],
  marcusRecord: [9, 'The written record'],
  marcusLeverage: [9, 'The written record'],
  institutional: [9, 'The written record'],
  reviewQualification: [9, 'The written record'],
  truths: [10, 'Competing truths'],
  disclosure: [10, 'Competing truths'],
  calendar: [11, 'The calendar'],
  departure: [12, 'The door closes'],
};
export const chapter3Number = (s: GameState) => groups[s.phase]?.[0] ?? 2;
export function chapter3Progress(s: GameState): string[][] {
  const seen = new Map<number, string[]>();
  for (const h of s.history) {
    const phase = h.node.replace('chapter3.', '');
    const g = groups[phase];
    if (g) seen.set(g[0], [h.node, g[1]]);
  }
  return [...seen.values()];
}
