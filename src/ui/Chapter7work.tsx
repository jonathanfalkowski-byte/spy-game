import type { Intent } from '../state/actions';
import type { GameState } from '../state/schema';
import { chapter7Choices } from '../content/chapter7';
import { displayName, renderChoiceText } from './reading-presentation';
export function Chapter7work({ state, send }: { state: GameState; send: (a: Intent) => void }) {
  const node = `${state.scene}.${state.phase}`;
  const choices = chapter7Choices(state);
  return choices.length ? (
    <section className="decision" aria-label="Chapter 7 action">
      <span className="eyebrow">Your next action</span>
      <div className="choice-list">
        {choices.map((c) => (
          <button key={c.id} data-chapter7-choice={c.id} onClick={() => send({ type: 'CHAPTER7_CHOOSE', id: c.id })}>
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
