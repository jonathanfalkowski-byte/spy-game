import type { ReadingBeat } from './chapter5-beats';
import { Narrative } from './Narrative';
export function Chapter5BeatSequence({
  beats,
  position,
  onPosition,
  ariaLabel = 'Harbour scene',
  narrativeNode = 'chapter5.room',
  contentRevision,
}: {
  beats: ReadingBeat[];
  position: number;
  onPosition: (position: number) => void;
  ariaLabel?: string;
  narrativeNode?: Parameters<typeof Narrative>[0]['node'];
  contentRevision?: number;
}) {
  const beat = beats[position];
  return (
    <section aria-label={ariaLabel} data-reading-shot={beat.shotId} tabIndex={-1}>
      <Narrative blocks={beat.blocks} node={narrativeNode} contentRevision={contentRevision} />
      <nav aria-label="Scene reading">
        {position > 0 && <button onClick={() => onPosition(position - 1)}>Previous moment</button>}
        {position < beats.length - 1 && (
          <button
            onClick={() => {
              const next = position + 1;
              onPosition(next);
            }}
          >
            Continue scene
          </button>
        )}
      </nav>
    </section>
  );
}
