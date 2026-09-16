import type { GameState } from '../state/schema';
import type { Intent } from '../state/actions';
import { availableMissionChoices, reasoningText, sourceNames } from '../content/mission';
import { displayName, missionActionLabel, personalRecap } from './reading-presentation';
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
              {missionActionLabel(c.id, c.label, state)}
              <small>{displayName(c.hint)}</small>
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
          <p>{displayName(m.capture.text)}</p>
          <p>{displayName(m.capture.limits)}</p>
          <p>
            Held by: {displayName(m.capture.owner)}. {displayName(m.capture.axiomAccess)}
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
            have stopped the exchange. Neither account resolves Evelynn’s earlier history or
            identifies the sender.
          </p>
        </>
      )}
      {m.outcome && (
        <section className="personal-recap" aria-label="Choices you carried here">
          <h3>Choices you carried here</h3>
          {personalRecap(state).map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p>
            {state.day.employment === 'terminated'
              ? 'Your employment remains terminated; the original housing notice still stands.'
              : 'Your office access remains suspended.'}{' '}
            The phone remains monitored.
          </p>
        </section>
      )}
    </>
  );
}
