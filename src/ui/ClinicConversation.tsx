import type { currentReadingBeats } from './scene-art';
import { Chapter5BeatSequence } from './Chapter5BeatSequence';
import { conversationHistory } from './chapter4-presentation';
import type { Ref } from 'react';
import type { GameState } from '../state/schema';
import { missionPresentation } from '../content/mission-presentation';
import { Narrative } from './Narrative';

export function ClinicConversation({
  state,
  latest,
  reading,
  readingPosition = 0,
  onReadMoment,
  illustrated = false,
}: {
  state: GameState;
  latest: Ref<HTMLDivElement>;
  reading?: ReturnType<typeof currentReadingBeats>;
  readingPosition?: number;
  onReadMoment: (position: number) => void;
  illustrated?: boolean;
}) {
  const node = state.scene + '.' + state.phase;
  const visibleHistory = conversationHistory(state);
  let start = visibleHistory.length;
  while (start > 0 && visibleHistory[start - 1].node === node) start--;
  const isChoice = (entry: GameState['history'][number]) =>
    entry.blocks.every((b) => b.kind === 'notice' && b.text.startsWith('Your choice: '));
  const incoming =
    start > 0 && !isChoice(visibleHistory[start - 1]) ? [visibleHistory[start - 1]] : [];
  const exchanges = visibleHistory.slice(start).filter((entry) => !isChoice(entry));
  const presentation =
    (state.contentRevision ?? 0) >= 12 || state.mission.completed.includes('home.begin')
      ? []
      : missionPresentation(state);
  return (
    <>
      {incoming.map((entry, i) =>
        // Other incoming entries can establish the current shot (e.g. phone placement).
        reading ||
        (illustrated &&
          state.scene === 'chapter3' &&
          state.phase === 'home' &&
          entry.node.startsWith('mission.')) ? (
          <details key={'incoming' + i} className="scene-recap">
            <summary>Previous scene</summary>
            <Narrative blocks={entry.blocks} node={entry.node} />
          </details>
        ) : (
          <Narrative key={'incoming' + i} blocks={entry.blocks} node={entry.node} />
        ),
      )}
      {exchanges.map((entry, i) => (
        <div
          key={start + i}
          data-clinic-exchange
          ref={i === exchanges.length - 1 ? latest : undefined}
          tabIndex={-1}
          aria-label={i === 0 ? 'Scene opening' : 'Conversation exchange'}
          style={{ scrollMarginTop: 90 }}
        >
          {reading?.entry === entry ? (
            <Chapter5BeatSequence
              beats={reading.beats}
              position={readingPosition}
              onPosition={onReadMoment}
            />
          ) : reading ? (
            <details className="scene-recap">
              <summary>Earlier in this scene</summary>
              <Narrative blocks={entry.blocks} node={entry.node} />
            </details>
          ) : (
            <Narrative blocks={entry.blocks} node={entry.node} />
          )}
          {i === exchanges.length - 1 && presentation.length > 0 && (
            <div data-mission-presentation aria-label="Operational context">
              <Narrative blocks={presentation} node={node} />
            </div>
          )}
        </div>
      ))}
      {exchanges.length === 0 && presentation.length > 0 && (
        <div
          data-mission-presentation
          tabIndex={-1}
          aria-label="Operational context"
          style={{ scrollMarginTop: 90 }}
        >
          <Narrative blocks={presentation} node={node} />
        </div>
      )}
    </>
  );
}
