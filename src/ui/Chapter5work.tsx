import type { Intent } from '../state/actions';
import type { GameState } from '../state/schema';
import { chapter5Choices } from '../content/chapter5';
export function Chapter5work({ state, send }: { state: GameState; send: (a: Intent) => void }) {
  const choices = chapter5Choices(state);
  return choices.length ? (
    <section className="decision" aria-label="Chapter 5 action">
      <span className="eyebrow">Your next action</span>
      <div className="choice-list">
        {choices.map((c) => (
          <button
            key={c.id}
            data-chapter5-choice={c.id}
            onClick={() => send({ type: 'CHAPTER5_CHOOSE', id: c.id })}
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
