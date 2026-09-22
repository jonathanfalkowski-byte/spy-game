import type { GameState } from '../state/schema';
import type { Intent } from '../state/actions';
import { availableDayChoices } from '../content/day';
import { displayName, renderChoiceText } from './reading-presentation';
export function Daywork({ state, send }: { state: GameState; send: (a: Intent) => void }) {
  const node = `${state.scene}.${state.phase}`;
  const choices = availableDayChoices(state);
  return (
    <>
      {!!choices.length && (
        <section className="decision" aria-label="Continue Adrian’s day">
          <span className="eyebrow">Your next action</span>
          <div className="choice-list">
            {choices.map((c) => (
              <button
                key={c.id}
                data-day-choice={c.id}
                onClick={() => send({ type: 'DAY_CHOOSE', id: c.id })}
              >
                <span className="choice-copy">
                  {displayName(renderChoiceText(c.label, node, state.contentRevision))}
                  <small>{displayName(renderChoiceText(c.hint, node, state.contentRevision))}</small>
                </span>
                <span aria-hidden="true">→</span>
              </button>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
