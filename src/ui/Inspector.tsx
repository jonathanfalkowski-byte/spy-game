import type { GameState } from '../state/schema';
import type { ArtIssue } from './scene-art';
import { unboundProductionAssets } from './scene-art';
export default function Inspector({
  state,
  visual,
}: {
  state: GameState;
  visual?: { shotId?: string; assetId?: string; issues: ArtIssue[] };
}) {
  return (
    <details className="inspector">
      <summary>Development state inspector</summary>
      <pre aria-label="Visual binding diagnostics">{JSON.stringify(visual, null, 2)}</pre>
      <pre aria-label="Unbound production art">
        {JSON.stringify(unboundProductionAssets(), null, 2)}
      </pre>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </details>
  );
}
