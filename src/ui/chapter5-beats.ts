import type { GameState } from '../state/schema';
import type { Block } from '../content/schema';
import { replayPrefix } from '../state/reducer';
import { julian5 } from '../content/chapter5-model';

export type ReadingBeat = { shotId: string; blocks: Block[]; file?: string; alt: string };
const lastChoice5 = (s: GameState, id: string) => {
  const a = s.ledger.at(-1)?.action;
  return a?.type === 'CHAPTER5_CHOOSE' && a.id === id;
};
export const coffeeAction5 = (s: GameState) =>
  s.scene === 'chapter5' && s.phase === 'room' && lastChoice5(s, 'chapter5.attention-coffee');

/** The completed evening arrival is one exact production hold, before any room action. */
export function harbourArrivalBeats5(s: GameState): ReadingBeat[] | undefined {
  if (
    s.scene !== 'chapter5' ||
    s.phase !== 'room' ||
    !lastChoice5(s, 'chapter5.look-professional') ||
    s.choices['c5.event'] !== 'attend' ||
    s.choices['c5.presentation'] !== 'professional' ||
    s.choices['c5.wardrobe'] !== 'c05.professional' ||
    s.choices['c5.harbour-position'] !== 'programme-table' ||
    s.choices['c5.coffee'] ||
    s.choices['c5.attention']
  )
    return;
  const entry = s.history.at(-1);
  if (
    entry?.node !== 'chapter5.room' ||
    !entry.blocks.some((b) =>
      b.text.startsWith('Inside, the host checks your name at the programme table'),
    )
  )
    return;
  return [
    {
      shotId: 'c05.s06.shot01-preview',
      blocks: entry.blocks,
      file: 'C5-H1-ARRIVAL-COMPOSITE-V3.png',
      alt: 'Evelynn has arrived at Harbour’s evening preview. The host has checked her name and handed over the programme and guest card.',
    },
  ];
}
/** Resolve against the action's authentic prefix, never later final flags. */
export function coffeeBeats5(
  s: GameState,
  entry: GameState['history'][number],
): ReadingBeat[] | undefined {
  if (s.scene !== 'chapter5' || s.phase !== 'room' || entry.node !== 'chapter5.room') return;
  const paragraph = entry.blocks.find((b) =>
    b.text.startsWith('You leave the programme table and wait outside'),
  );
  if (!paragraph) return;
  const event = s.ledger.find(
    (e) => e.action.type === 'CHAPTER5_CHOOSE' && e.action.id === 'chapter5.attention-coffee',
  );
  if (!event) return;
  const before = replayPrefix(s.ledger.slice(0, event.sequence - 1), s.contentRevision);
  const after = replayPrefix(s.ledger.slice(0, event.sequence), s.contentRevision);
  const index = s.history.indexOf(entry);
  if (index < before.history.length || index >= after.history.length) return;
  const professional =
    before.choices['c5.presentation'] === 'professional' &&
    before.choices['c5.wardrobe'] === 'c05.professional';
  const eligible =
    professional &&
    before.choices['c5.event'] === 'attend' &&
    julian5(before) &&
    before.choices['c5.harbour-position'] === 'programme-table';
  const text = paragraph.text;
  const arrival = text.indexOf('Julian arrives');
  const departure = text.includes('He says goodbye')
    ? text.indexOf('He says goodbye')
    : text.indexOf('then he says goodbye');
  const returned = text.indexOf('You go back inside');
  if (arrival < 0 || departure < arrival || returned < departure) return;
  const p = (text: string): Block => ({ kind: 'narrative', text });
  return [
    {
      shotId: 'c05.s06.shot14-wait',
      blocks: [...entry.blocks.filter((b) => b !== paragraph), p(text.slice(0, arrival).trim())],
      alt: 'Evelynn waits outside Harbour with one coffee.',
    },
    {
      shotId: 'c05.s06.shot12-entrance',
      blocks: [p(text.slice(arrival, departure).trim().replace(/,$/, '.'))],
      file: eligible ? 'C5-HARBOUR-EVELYNN-JULIAN-COMPOSITE-V2.png' : undefined,
      alt: 'Evelynn and Julian outside Harbour, speaking at a distance; Evelynn holds one coffee.',
    },
    {
      shotId: 'c05.s06.shot15-departed',
      blocks: [
        p(
          text
            .slice(departure, returned)
            .trim()
            .replace(/^then he/, 'He'),
        ),
      ],
      file: eligible ? 'C5-HARBOUR-JULIAN-DEPARTED-COMPOSITE-V1.png' : undefined,
      alt: 'Julian has left. Evelynn remains outside Harbour with her coffee.',
    },
    {
      shotId: 'c05.s06.shot13-return',
      blocks: [p(text.slice(returned))],
      file: eligible ? 'C5-H2-COFFEE-RETURN-COMPOSITE-V1.png' : undefined,
      alt: 'Evelynn returns to the host at the programme table; her cup remains in her custody.',
    },
  ];
}

/** The approved Aster arrival holds only until the player proceeds from accepted terms. */
export function asterArrivalBeats5(s: GameState): ReadingBeat[] | undefined {
  if (
    s.scene !== 'chapter5' ||
    s.phase !== 'proof' ||
    !lastChoice5(s, 'chapter5.offer-accept-professional') ||
    s.choices['c5.offer'] !== 'accepted' ||
    s.choices['c5.concept'] !== 'professional' ||
    s.choices['c5.presentation'] !== 'professional' ||
    s.choices['c5.wardrobe'] !== 'c05.professional' ||
    s.choices['c5.coffee'] ||
    s.choices['c5.published'] ||
    s.choices['c5.authorization']
  )
    return;
  const entry = [...s.history]
    .reverse()
    .find(
      (candidate) =>
        candidate.node === 'chapter5.offer' &&
        candidate.blocks.some((b) => b.text.startsWith('You confirm the 11:30 appointment')),
    );
  if (!entry) return;
  return [
    {
      shotId: 'c05.s07.shot03-arrival',
      blocks: entry.blocks,
      file: 'C5-S07-ASTER-ARRIVAL-COMPOSITE-V2.png',
      alt: 'Evelynn arrives at Aster’s studio for the agreed professional sitting while the editor reads the scope back before work begins.',
    },
  ];
}

export function chapter5ReadingBeats(
  s: GameState,
): { beats: ReadingBeat[]; entry: GameState['history'][number] } | undefined {
  const direct = harbourArrivalBeats5(s) ?? asterArrivalBeats5(s);
  if (direct) {
    for (let i = s.history.length - 1; i >= 0; i--) {
      if (direct.some((beat) => s.history[i].blocks === beat.blocks))
        return { beats: direct, entry: s.history[i] };
    }
    return;
  }
  if (!coffeeAction5(s)) return;
  for (let i = s.history.length - 1; i >= 0; i--) {
    const beats = coffeeBeats5(s, s.history[i]);
    if (beats) return { beats, entry: s.history[i] };
  }
}

export function apartmentEndingArt5(s: GameState) {
  const c = s.choices,
    a = s.ledger.at(-1)?.action;
  if (
    s.scene !== 'chapter5' ||
    s.phase !== 'complete' ||
    a?.type !== 'CHAPTER5_CHOOSE' ||
    a.id !== 'chapter5.place-phone'
  )
    return;
  const required = {
    'c5.presentation': 'professional',
    'c5.wardrobe': 'c05.professional',
    'c5.purchase': 'phone',
    'c5.placement': 'phone',
    'c5.personal-location': 'table-unboxed',
    'c5.axiom-location': 'table-home',
    'c5.offer': 'declined',
    'c5.old-jacket': 'wardrobe',
  };
  if (
    !s.ledger.some(
      (e) => e.action.type === 'CHAPTER5_CHOOSE' && e.action.id === 'chapter5.want-none',
    )
  )
    return;
  if (
    !Object.entries(required).every(([k, v]) => c[k] === v) ||
    ['c5.published', 'c5.event-photo', 'c5.went-out', 'c5.authorization', 'c5.intimacy'].some(
      (k) => !!c[k],
    )
  )
    return;
  return {
    shotId: 'c05.s12.shot05-phone',
    file: 'C5-S12-SHOT05-PHONE-COMPOSITE-V2.png',
    alt: 'Evelynn places her purchased phone beside the Axiom handset in the same apartment at night. Adrian’s jacket remains inside the wardrobe.',
  };
}
