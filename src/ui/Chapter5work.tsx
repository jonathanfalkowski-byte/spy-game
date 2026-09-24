import { useState } from 'react';
import { isCurrentAuthoringRevision } from '../content/revision';
import type { Intent } from '../state/actions';
import type { GameState } from '../state/schema';
import { chapter5Choices } from '../content/chapter5';
import { asterConcepts, concept5, proposal5, rights5 } from '../content/chapter5-public';
import { displayName, renderChoiceText } from './reading-presentation';
export function Chapter5work(props: { state: GameState; send: (a: Intent) => void }) {
  return <Chapter5Decisions key={props.state.scene + '.' + props.state.phase} {...props} />;
}
function Chapter5Decisions({ state, send }: { state: GameState; send: (a: Intent) => void }) {
  const node = `${state.scene}.${state.phase}`;
  const currentConcept = concept5(state);
  const [draft, setDraft] = useState({ base: currentConcept, value: currentConcept });
  const concept = draft.base === currentConcept ? draft.value : currentConcept;
  const proposal =
    (isCurrentAuthoringRevision(state.contentRevision)) && state.scene === 'chapter5' && state.phase === 'offer';
  const choices = chapter5Choices(state).filter(
    (c) =>
      !proposal ||
      !c.id.startsWith('chapter5.offer-accept') ||
      c.id === 'chapter5.offer-accept-' + concept,
  );
  return choices.length ? (
    <section className="decision" aria-label="Chapter 5 action">
      {state.scene === 'chapter5' && state.phase === 'offer' && (
        <section aria-label="Current Aster proposal">
          <h2>Current proposal</h2>
          {proposal && (
            <label>
              Final concept
              <select
                aria-label="Final concept"
                value={concept}
                onChange={(e) => setDraft({ base: currentConcept, value: e.target.value })}
              >
                {asterConcepts.map((id) => (
                  <option key={id} value={id}>
                    {id}
                  </option>
                ))}
              </select>
            </label>
          )}
          <p data-current-terms aria-live="polite">
            {displayName(rights5(proposal ? proposal5(state, concept) : state))}
          </p>
          {proposal && (
            <small>
              You can return to any concept here. Only accepting records this final selection.
              Earlier correspondence remains in the history.
            </small>
          )}
        </section>
      )}
      <span className="eyebrow">Your next action</span>
      <div className="choice-list">
        {choices.map((c) => (
          <button
            key={c.id}
            data-chapter5-choice={c.id}
            onClick={() => send({ type: 'CHAPTER5_CHOOSE', id: c.id })}
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
  ) : null;
}
