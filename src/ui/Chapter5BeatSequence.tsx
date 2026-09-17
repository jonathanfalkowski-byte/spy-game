import { useState } from 'react';
import type { ReadingBeat } from './chapter5-beats';
import { Narrative } from './Narrative';
export function Chapter5BeatSequence({
  beats,
  onComplete,
}: {
  beats: ReadingBeat[];
  onComplete?: () => void;
}) {
  const [position, setPosition] = useState(0);
  const beat = beats[position];
  return (
    <section aria-label="Harbour scene" data-reading-shot={beat.shotId}>
      <Narrative blocks={beat.blocks} node="chapter5.room" />
      {beat.file ? (
        <img
          className="chapter5-scene-art"
          src={'art/chapter5/' + beat.file}
          alt={beat.alt}
          style={{ width: '100%', height: 'auto' }}
        />
      ) : (
        <p className="notice">This moment is shown in text; its illustration is pending.</p>
      )}
      <nav aria-label="Scene reading">
        {position > 0 && <button onClick={() => setPosition(position - 1)}>Previous moment</button>}
        {position < beats.length - 1 && (
          <button
            onClick={() => {
              const next = position + 1;
              setPosition(next);
              if (next === beats.length - 1) onComplete?.();
            }}
          >
            Continue scene
          </button>
        )}
      </nav>
    </section>
  );
}
