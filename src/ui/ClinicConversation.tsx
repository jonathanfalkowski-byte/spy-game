import type { Ref } from 'react';
import type { GameState } from '../state/schema';
import { Narrative } from './Narrative';

export function ClinicConversation({
  state,
  latest,
}: {
  state: GameState;
  latest: Ref<HTMLDivElement>;
}) {
  const node = state.scene + '.' + state.phase;
  let start = state.history.length;
  while (start > 0 && state.history[start - 1].node === node) start--;
  const isChoice = (entry: GameState['history'][number]) =>
    entry.blocks.every((b) => b.kind === 'notice' && b.text.startsWith('Your choice: '));
  const incoming =
    start > 0 && !isChoice(state.history[start - 1]) ? [state.history[start - 1]] : [];
  const exchanges = state.history.slice(start).filter((entry) => !isChoice(entry));
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
          <Narrative blocks={entry.blocks} node={entry.node} />
        </div>
      ))}
    </>
  );
}
