import type { Intent } from '../state/actions';
import type { GameState } from '../state/schema';
import { chapter18Choices } from '../content/chapter18';
import { displayName, renderChoiceText } from './reading-presentation';
export function Chapter18work({ state, send }: { state: GameState; send: (a: Intent) => void }) {
  const node = `${state.scene}.${state.phase}`;
  const choices = chapter18Choices(state);
  return choices.length ? (
    <section className="decision" aria-label="Chapter 18 action">
      <span className="eyebrow">Your next action</span>
      <div className="choice-list">
        {choices.map((c) => (
          <button key={c.id} data-chapter18-choice={c.id} onClick={() => send({ type: 'CHAPTER18_CHOOSE', id: c.id })}>
            <span className="choice-copy">
              {displayName(renderChoiceText(c.label, node, state.contentRevision))}
              <small>{displayName(renderChoiceText(c.hint, node, state.contentRevision))}</small>
            </span>
            <span aria-hidden="true">→</span>
          </button>
        ))}
      </div>
    </section>
  ) : null;
}
