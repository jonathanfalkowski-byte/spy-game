import type { ReadingBeat } from './chapter5-beats';
import { Narrative } from './Narrative';
export function Chapter5BeatSequence({
  beats,
  position,
  onPosition,
}: {
  beats: ReadingBeat[];
  position: number;
  onPosition: (position: number) => void;
}) {
  const beat = beats[position];
  return (
    <section aria-label="Harbour scene" data-reading-shot={beat.shotId} tabIndex={-1}>
      <Narrative blocks={beat.blocks} node="chapter5.room" />
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
