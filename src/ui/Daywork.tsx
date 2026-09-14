import type { GameState } from '../state/schema';
import type { Intent } from '../state/actions';
import { availableDayChoices } from '../content/day';
export function Daywork({ state, send }: { state: GameState; send: (a: Intent) => void }) {
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
                  {c.label}
                  <small>{c.hint}</small>
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
