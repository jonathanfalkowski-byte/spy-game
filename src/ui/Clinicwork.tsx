import type { GameState } from '../state/schema';
import type { Intent } from '../state/actions';
import { availableClinicChoices } from '../content/clinic';
import { displayName } from './reading-presentation';
export function Clinicwork({ state, send }: { state: GameState; send: (a: Intent) => void }) {
  const choices = availableClinicChoices(state);
  if (!choices.length) return null;
  return (
    <section className="decision" aria-label="Sublevel 17 choices">
      <span className="eyebrow">Your next action</span>
      <div className="choice-list">
        {choices.map((c) => (
          <button
            key={c.id}
            data-clinic-choice={c.id}
            onClick={() => send({ type: 'CLINIC_CHOOSE', id: c.id })}
          >
            <span className="choice-copy">
              {c.id === 'c.screened' ? 'Continue the descent' : displayName(c.label)}
              <small>{displayName(c.hint)}</small>
            </span>
            <span aria-hidden="true">→</span>
          </button>
        ))}
      </div>
    </section>
  );
}
