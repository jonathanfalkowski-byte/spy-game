import type { Intent } from '../state/actions';
import type { GameState } from '../state/schema';
import { chapter4Choices } from '../content/chapter4';
import { displayName } from './reading-presentation';
export function Chapter4work({ state, send }: { state: GameState; send: (a: Intent) => void }) {
  const choices = chapter4Choices(state);
  return choices.length ? (
    <section className="decision" aria-label="Chapter 4 action">
      <span className="eyebrow">Your next action</span>
      <div className="choice-list">
        {choices.map((c) => (
          <button
            key={c.id}
            data-chapter4-choice={c.id}
            onClick={() => send({ type: 'CHAPTER4_CHOOSE', id: c.id })}
          >
            <span className="choice-copy">
              {displayName(c.label)}
              <small>{displayName(c.hint)}</small>
            </span>
            <span aria-hidden="true">→</span>
          </button>
        ))}
      </div>
    </section>
  ) : null;
}
