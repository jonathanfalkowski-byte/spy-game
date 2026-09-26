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
  const answer11 = c(s, 'c11.answer') as LeverageStatus | undefined;
  const answer13 = c(s, 'c13.answer') as LeverageStatus | undefined;
  const answer14 = c(s, 'c14.answer') as LeverageStatus | undefined;
  const latest = answer14 ?? answer13 ?? answer11 ?? answer;
  const broken = c(s, 'act3.leash') === 'broken';
  if (broken)
    held.push({
      holder: 'Celeste Laurent',
      holds: c(s, 'act3.adrian') === 'held' ? ['Adrian Vale’s name, in her head if not in a drawer'] : [],
      status: 'countered',
      source: 'The archive, emptied; the black phone, answered: “No more orders.”',
    });
  else held.push({
    holder: 'Celeste Laurent',
    holds: [
      'Maya Reyes’s clearance',
      'Adrian Vale’s name',
      'The apartment (Meridian owns the building)',
      ...(c(s, 'act3.placement') ? ['A placement date: the first Thursday of next month'] : []),
      ...(c(s, 'c12.cover') ? ['Singapore: where you went, and whom you saw'] : []),
      ...(c(s, 'c12.harbour') ? ['A photograph of Maya leaving work, taken from across the road'] : []),
    ],
    ...(answer14
      ? { wants: 'Victoria Sloane and her file, at the Vesper, Sunday at six', threat: 'Adrian Vale’s name, to Axiom; the flat' }
      : answer13
      ? {
          wants: 'Owen Marsh, on camera, in suite 1109 at the Claremont',
          threat: c(s, 'act3.maya-status') === 'detained' ? 'Maya, detained on a leak charge: suspended, on bail' : 'Maya, on a leak charge already written',
        }
      : answer11
      ? { wants: 'Iris Moreau, ended, by your hand', threat: 'Maya’s clearance, escalated' }
      : target
        ? {
            wants: orderWants[target] + (target === 'notes' && c(s, 'c7.notes') === 'maya' ? ', and the copy Maya holds' : ''),
            threat: 'Maya’s clearance renewal, in nine days',
          }
        : {}),
    status: latest === 'complied' || latest === 'refused' || latest === 'countered' ? latest : 'open',
    source: answer14 ? 'The black phone, the Saturday after the Claremont' : answer13 ? 'The Vesper reading room, the placement' : answer11 ? 'The Vesper terrace, the first Thursday' : 'Breakfast, and the black phone with one contact',
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
  if (c(s, 'c8.pryce'))
    held.push({
      holder: 'Mr Pryce (D.P.)',
      holds: ['A key to your flat', 'Your window, your boiler, her post', 'A pair of binoculars across the gap'],
      status: 'open',
      source: 'Property Services, and the flat opposite',
    });

  const holds: LeverageAsset[] = [];
  const strength = c(s, 'case.strength');
  if (c(s, 'case.name'))
    holds.push({ id: 'case', label: `The case against Celeste${strength ? ` (${strength})` : ''}`, source: 'What you assembled' });
  if (c(s, 'c9.lever')) holds.push({ id: 'oracle', label: 'ORACLE’s verdict: the product was uncontrollable, and they sold it anyway', source: 'The prediction, turned into a lever' });
  if (c(s, 'c8.list') === 'read') holds.push({ id: 'inventory', label: 'VALE, E. · RETURNED TO INVENTORY · REISSUED', source: 'Meridian’s client list, read line by line' });
  if (c(s, 'c8.list') === 'copied') holds.push({ id: 'list', label: 'Meridian’s client list, copied three ways', source: 'The night you got over the wall' });
  if (c(s, 'c6.photo-custody') === 'phone') holds.push({ id: 'leaf', label: 'The ledger leaf, photographed and kept', source: 'Your own phone' });
  if (s.mission.capture?.owner === 'Evelyn' || s.mission.token === 'evelyn') holds.push({ id: 'glass-house', label: 'What you carried out of the Glass House yourself', source: 'The Glass House' });
  if (c(s, 'c9.rent')) holds.push({ id: 'watcher-rent', label: 'The watcher’s rent: L.S.F. Facilities, the Laurent fund’s own company', source: 'The building opposite' });
  if (c(s, 'c7.bundle') === 'card') holds.push({ id: 'held', label: 'D.P.’s HELD card: her post, kept fourteen months and released on instruction', source: 'The post room' });
  if (c(s, 'c8.photos') === 'all') holds.push({ id: 'photos', label: 'Nine photographs from Emerald Hill, and the tall woman whose face is turned away', source: 'Lotte' });
  else if (c(s, 'c8.photos') === 'one') holds.push({ id: 'photos', label: 'One photograph: her, laughing on a balcony in Singapore', source: 'Lotte' });
  if (c(s, 'c9.kessler') === 'follow') holds.push({ id: 'kessler', label: 'Anna Kessler: the last one, one season, no family', source: 'The periodicals room' });
  if (c(s, 'c9.lawyer') === 'retain') holds.push({ id: 'lawyer', label: 'Nadia Brandt, when you are ready and not a day before', source: 'Above the locksmith’s' });
  if (c(s, 'c11.catalogue') === 'photo') holds.push({ id: 'catalogue', label: 'The Autumn Collection, photographed: your page and Iris’s', source: 'The Vesper’s reading room' });
  else if (c(s, 'c11.catalogue') === 'page') holds.push({ id: 'catalogue', label: 'Page seven of The Autumn Collection: your own, torn out', source: 'The Vesper’s reading room' });
  if (c(s, 'act3.ally.iris') === 'in') holds.push({ id: 'iris', label: 'Iris Moreau, who knows how the house works, and owes you', source: 'The Vesper cloakroom' });
  if (c(s, 'c12.search') === 'desk') holds.push({ id: 'schedule', label: 'Site SG/EH-9: the flat kept lived-in for a reissue, and a sister “not to be disturbed”', source: 'The bureau at number 9, Emerald Hill' });
  if (c(s, 'c12.search') === 'wardrobe') holds.push({ id: 'penang', label: 'A boarding pass to Penang, never used: she was running', source: 'A hatbox at number 9' });
  if (c(s, 'c12.caught') === 'hide') holds.push({ id: 'site-report', label: 'The caretaker’s report: Straits Property Services, the Marlowe, fourth floor', source: 'A clipboard, read through a bathroom door' });
  else if (c(s, 'c12.caught') === 'own') holds.push({ id: 'site-report', label: 'Nine flats in Singapore, kept for tenants who never come', source: 'The caretaker, in the doorway of number 9' });
  if (c(s, 'c12.bed') === 'drawer') holds.push({ id: 'note', label: 'Her unsent note to Nora: “Not even for her. Especially not for her.”', source: 'Behind the bedside drawer at number 9' });
  if (c(s, 'c12.statement') === 'recorded') holds.push({ id: 'ashby', label: 'Colin Ashby on the record: the order to burn her came “from a friend of hers”', source: 'The Punkah Bar, the Marlowe' });
  if (c(s, 'act3.ally.nora') === 'in') holds.push({ id: 'nora', label: 'Nora Linden, who wants to be in the room', source: 'A kitchen in Holland Village' });
  if (c(s, 'act3.nell') === 'known') holds.push({ id: 'nell', label: 'Her name: Eleanor Linden. Nell.', source: 'Her sister' });
  if (c(s, 'act3.ally.marsh') === 'in') holds.push({ id: 'marsh', label: 'Owen Marsh of the Markets Authority, who knows he was the target, and is in it now', source: 'The Claremont, suite 1109' });
  if (c(s, 'c13.card') === 'taken') holds.push({ id: 'card-1109', label: 'The 1109 card: a month of Meridian placements on Meridian’s own camera', source: 'Iris, behind the mirror' });
  if (c(s, 'act3.honeypot') === 'burned') holds.push({ id: 'broadcast', label: 'The honeypot, burned in public before it happened', source: c(s, 'c13.told') === 'theo' ? 'Theo Marr’s show' : 'The Courier' });
  if (c(s, 'c14.file') === 'yes' && c(s, 'c14.copy') !== 'no')
    holds.push({ id: 'verdict', label: c(s, 'c14.copy') === 'yes' ? 'A photograph of every page of the signed ORACLE verdict' : 'The ORACLE verdict, with the board’s sign-off and C. Laurent’s signature', source: 'Victoria Sloane’s own copy' });
  if (c(s, 'act3.sloane') === 'free') holds.push({ id: 'sloane', label: 'Victoria Sloane, free, and out of Celeste’s reach', source: 'The Vesper, Sunday' });
  if (c(s, 'act3.maya-choice') === 'witness' || c(s, 'act3.maya-choice') === 'stay') holds.push({ id: 'maya', label: c(s, 'act3.maya-choice') === 'stay' ? 'Maya Reyes, who knows, and is in it with you' : 'Maya Reyes, on the record about the forged emails', source: 'Maya’s kitchen' });
  if (c(s, 'act3.celeste-afraid') === 'yes') holds.push({ id: 'terms', label: 'Celeste’s word: no orders until the board has met', source: 'The reading room, Sunday' });
  if (c(s, 'c15.maya-file') === 'yes') holds.push({ id: 'maya-file', label: 'The drafts of the emails used against Maya, with the writer’s name on every one', source: 'The archive at the Vesper' });
  if (c(s, 'act3.page') === 'torn') holds.push({ id: 'page-seven', label: 'Page seven, torn out of The Autumn Collection', source: 'The lectern at the Vesper' });
  if (c(s, 'act3.adrian') === 'hers') holds.push({ id: 'adrian-file', label: 'Adrian Vale’s file: nobody spends the name again', source: 'The archive at the Vesper' });
  if (c(s, 'act3.cards') === 'taken') holds.push({ id: 'cards', label: 'The 1109 safe: years of placements on Meridian’s own camera', source: 'The archive at the Vesper' });
  if (c(s, 'act3.nell-order') === 'taken') holds.push({ id: 'nell-order', label: 'The order that burned Nell in Jakarta, signed C.', source: 'Nell’s drawer in the archive' });
  if (c(s, 'act3.switch') === 'set') holds.push({ id: 'switch', label: 'The dead man’s switch: three copies of everything, with three people', source: 'The week after the archive' });
  if (c(s, 'act4.aim'))
    holds.push({
      id: 'aim',
      label: ({ expose: 'What you want: the truth, in public', terms: 'What you want: terms nobody can revoke', nell: 'What you want: Nell’s name, said out loud', out: 'What you want: a clean way out' } as Record<string, string>)[c(s, 'act4.aim') as string] ?? 'What you want',
      source: 'Thursday morning, the kitchen table',
    });
  if (c(s, 'act4.inside') && c(s, 'act4.inside') !== 'none') holds.push({ id: 'crew', label: 'In the room with you: ' + (c(s, 'act4.inside') as string).split(',').join(', '), source: 'Thursday morning' });
  if (c(s, 'act4.terms') === 'full' || c(s, 'act4.terms') === 'partial')
    holds.push({ id: 'undertaking', label: c(s, 'act4.terms') === 'full' ? 'The board’s undertaking, in fountain pen, on the back of the verdict' : 'Part of what you asked for, in writing; the rest held by the switch', source: 'The Meridian board, Thursday' });
  if (c(s, 'c10.kept-copy')) holds.push({ id: 'kept-copy', label: 'A photograph of every page you handed her', source: 'Under the Lindqvist awning, in the rain' });
  if (c(s, 'c10.poison')) holds.push({ id: 'poison', label: 'A poisoned detail, waiting to show you who she passes your notes to', source: 'The notes you rewrote' });
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
