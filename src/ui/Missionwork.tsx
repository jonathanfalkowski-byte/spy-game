import type { GameState } from '../state/schema';
import type { Intent } from '../state/actions';
import { availableMissionChoices, reasoningText, sourceNames } from '../content/mission';
export function Missionwork({ state, send }: { state: GameState; send: (a: Intent) => void }) {
  const choices = availableMissionChoices(state);
  return choices.length ? (
    <section className="decision" aria-label="Glass House choices">
      <span className="eyebrow">Your next action</span>
      <div className="choice-list">
        {choices.map((c) => (
          <button
            key={c.id}
            data-mission-choice={c.id}
            onClick={() => send({ type: 'MISSION_CHOOSE', id: c.id })}
          >
            <span className="choice-copy">
              {c.label}
              <small>{c.hint}</small>
            </span>
            <span aria-hidden="true">→</span>
          </button>
        ))}
      </div>
    </section>
  ) : null;
}
export function MissionSummary({ state }: { state: GameState }) {
  const m = state.mission;
  if (!m.source) return null;
  return (
    <>
      <h3>Your assessment</h3>
      <p>
        {sourceNames[m.source]}. {reasoningText(state)}
      </p>
      {m.capture && (
        <>
          <h3>What you brought back</h3>
          <p>{m.capture.text}</p>
          <p>{m.capture.limits}</p>
          <p>
            Held by: {m.capture.owner}. {m.capture.axiomAccess}
          </p>
        </>
      )}
      {m.outcome && (
        <>
          <h3>What remains unresolved</h3>
          <p>
            Marcus noticed your interest and signalled security. You left through the east elevator.
            Neither his attention nor Benton’s reaction established that they identified Adrian.
          </p>
          <p>
            Sloane says your judgment was another objective. The unknown sender claims she could
            have stopped the exchange. Neither account resolves Evelyn’s earlier history or
            identifies the sender.
          </p>
        </>
      )}
    </>
  );
}
