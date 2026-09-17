import { calendarInvites, calendarStatus, recipientNames } from '../content/chapter3-autonomy';
import type { Intent } from '../state/actions';
import type { GameState } from '../state/schema';
import { availableChapter3Choices, availableIntents } from '../state/reducer';
import { displayName } from './reading-presentation';
export function Chapter3work({ state, send }: { state: GameState; send: (a: Intent) => void }) {
  if (availableIntents(state).some((a) => a.type === 'CONTINUE_CHAPTER3_SCENE2'))
    return (
      <section className="decision" aria-label="Chapter 3 continuation">
        <button onClick={() => send({ type: 'CONTINUE_CHAPTER3_SCENE2' })}>
          Continue Chapter 3 · What you can tell her
        </button>
        <p>Continue into Scene 2. Your earlier decisions and history remain intact.</p>
      </section>
    );
  const choices = availableChapter3Choices(state);
  return choices.length ? (
    <section className="decision" aria-label="Chapter 3 action">
      <span className="eyebrow">Your next action</span>
      {(state.contentRevision === 14 || state.contentRevision === 17) && state.phase === 'calendar' && (
        <ul aria-label="Current appointments">
          {calendarInvites(state).map((r) => (
            <li key={r}>
              {recipientNames[r]}: {calendarStatus(state, r)}
            </li>
          ))}
        </ul>
      )}
      <div className="choice-list">
        {choices.map((c) => (
          <button
            key={c.id}
            data-chapter3-choice={c.id}
            onClick={() => send({ type: 'CHAPTER3_CHOOSE', id: c.id })}
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
