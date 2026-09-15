import type { Intent } from '../state/actions';
import type { GameState } from '../state/schema';
import { chapter3Choices } from '../content/chapter3';
import { displayName } from './reading-presentation';
export function Chapter3work({ state, send }: { state: GameState; send: (a: Intent) => void }) {
  const choices = chapter3Choices.filter((c) => c.node === `${state.scene}.${state.phase}` && !state.day.completed.includes(c.id));
  return choices.length ? <section className="decision" aria-label="Chapter 3 action"><span className="eyebrow">Your next action</span><div className="choice-list">{choices.map((c) => <button key={c.id} data-chapter3-choice={c.id} onClick={() => send({ type: 'CHAPTER3_CHOOSE', id: c.id })}><span className="choice-copy">{displayName(c.label)}<small>{displayName(c.hint)}</small></span><span aria-hidden="true">→</span></button>)}</div></section> : null;
}
