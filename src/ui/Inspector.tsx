import type { GameState } from '../state/schema';
export default function Inspector({ state }: { state: GameState }) {
  return (
    <details className="inspector">
      <summary>Development state inspector</summary>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </details>
  );
}
