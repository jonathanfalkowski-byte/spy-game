import { coffeeBeats5 } from './chapter5-beats';
import { Chapter5BeatSequence } from './Chapter5BeatSequence';
import { useMemo } from 'react';
import { conversationHistory } from './chapter4-presentation';
import type { Ref } from 'react';
import type { GameState } from '../state/schema';
import { missionPresentation } from '../content/mission-presentation';
import { Narrative } from './Narrative';

export function ClinicConversation({
  state,
  latest,
  onSceneRead,
}: {
  state: GameState;
  latest: Ref<HTMLDivElement>;
  onSceneRead?: () => void;
}) {
  const beatMap = useMemo(() => new Map(state.history.map(h => [h, coffeeBeats5(state,h)])), [state]);
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
      {incoming.map((entry, i) => (
        <Narrative key={'incoming' + i} blocks={entry.blocks} node={entry.node} />
      ))}
      {exchanges.map((entry, i) => (
        <div
          key={start + i}
          data-clinic-exchange
          ref={i === exchanges.length - 1 ? latest : undefined}
          tabIndex={-1}
          aria-label={i === 0 ? 'Scene opening' : 'Conversation exchange'}
          style={{ scrollMarginTop: 90 }}
        >
          {beatMap.get(entry) ? <Chapter5BeatSequence beats={beatMap.get(entry)!} onComplete={onSceneRead} /> : <Narrative blocks={entry.blocks} node={entry.node} />}
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
