import type { Block } from '../content/schema';
import type { GameState } from '../state/schema';
import type { ReadingBeat } from './chapter5-beats';

export type OpeningReadingSequence = {
  beats: ReadingBeat[];
  entry: GameState['history'][number];
};

const DANIEL_MARKER = 'Daniel is waiting beside your desk.';
const ELEVATOR_MARKER = 'The elevator carries you to Strategic Intelligence.';

export function openingReadingTitle(shotId?: string): string | undefined {
  switch (shotId) {
    case 'opening.axiom.shot01-approach': return 'From home to Axiom';
    case 'opening.axiom.shot02-security': return 'Axiom security';
    case 'opening.axiom.shot03-office-arrival': return 'Strategic Intelligence';
    case 'opening.office.shot01-daniel': return 'Daniel at your desk';
  }
}

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

  // Finish security in the security beat; the next screen starts with the
  // elevator journey. Split display text only, retaining the authored record.
  const elevatorIndex = officeArrivalText.indexOf(ELEVATOR_MARKER);
  const securityExit: Block[] = elevatorIndex > 0
    ? [{ ...finalBlock, text: officeArrivalText.slice(0, elevatorIndex).trim() }]
    : [];
  const officeArrival: Block = {
    ...finalBlock,
    text: elevatorIndex > 0 ? officeArrivalText.slice(elevatorIndex).trim() : officeArrivalText,
  };
  const daniel: Block = { ...finalBlock, text: danielText };
  const beats: ReadingBeat[] = [
    {
      shotId: 'opening.axiom.shot01-approach',
      file: 'art/opening/axiom-approach-v2-production.png',
      blocks: [entry.blocks[0]],
      alt: 'Adrian approaches Axiom Tower through the rain and employee entrance.',
    },
    {
      shotId: 'opening.axiom.shot02-security',
      file: 'art/opening/axiom-security-lobby-v2-production.png',
      blocks: [entry.blocks[1], entry.blocks[2], entry.blocks[3], ...securityExit],
      alt: 'Axiom lobby security channels the morning queue through screening lanes and locked gates.',
    },
    {
      shotId: 'opening.axiom.shot03-office-arrival',
      file: 'art/opening/axiom-office-arrival-v1-production.png',
      blocks: [officeArrival],
      alt: 'After screening, Adrian collects his coat and phone, clears the inner gate and reaches Strategic Intelligence.',
    },
    {
      shotId: 'opening.office.shot01-daniel',
      file: 'art/opening/axiom-opening-office-shot01-daniel-v1-production.png',
      blocks: [daniel],
      alt: 'Daniel is waiting beside Adrian’s desk in Strategic Intelligence.',
    },
  ];
  return { beats, entry };
}
