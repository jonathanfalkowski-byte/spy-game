import type { Block } from '../content/schema';
import type { GameState } from '../state/schema';
import type { ReadingBeat } from './chapter5-beats';

export type OpeningReadingSequence = {
  beats: ReadingBeat[];
  entry: GameState['history'][number];
};

const DANIEL_MARKER = 'Daniel is waiting beside your desk.';

/**
 * Opening commute cuts are presentation-only. The authored commute entry and
 * its save/replay history remain one immutable record; only the final prose
 * block is divided at the authored arrival of a new participant.
 */
export function openingReadingBeats(s: GameState): OpeningReadingSequence | undefined {
  if (s.scene !== 'commute' || s.phase !== 'arrival') return;
  const entry = [...s.history].reverse().find((candidate) => candidate.node === 'commute.arrival');
  if (!entry || entry.blocks.length < 5) return;

  const finalBlock = entry.blocks[entry.blocks.length - 1];
  const markerIndex = finalBlock.text.lastIndexOf(DANIEL_MARKER);
  if (markerIndex < 0) return;
  const officeArrivalText = finalBlock.text.slice(0, markerIndex).trim();
  const danielText = finalBlock.text.slice(markerIndex).trim();
  if (!officeArrivalText || !danielText) return;

  const officeArrival: Block = { ...finalBlock, text: officeArrivalText };
  const daniel: Block = { ...finalBlock, text: danielText };
  const beats: ReadingBeat[] = [
    {
      shotId: 'opening.axiom.shot01-approach',
      blocks: [entry.blocks[0]],
      alt: 'Adrian approaches Axiom Tower through the rain and employee entrance.',
    },
    {
      shotId: 'opening.axiom.shot02-security',
      blocks: [entry.blocks[1], entry.blocks[2], entry.blocks[3]],
      alt: 'Axiom lobby security channels the morning queue through screening lanes and locked gates.',
    },
    {
      shotId: 'opening.axiom.shot03-office-arrival',
      blocks: [officeArrival],
      alt: 'After screening, Adrian collects his coat and phone, clears the inner gate and reaches Strategic Intelligence.',
    },
    {
      shotId: 'opening.office.shot01-daniel',
      blocks: [daniel],
      alt: 'Daniel is waiting beside Adrian’s desk in Strategic Intelligence.',
    },
  ];
  return { beats, entry };
}
