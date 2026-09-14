import { useState } from 'react';
import type { GameState } from '../state/schema';
import { journalEntries, milestoneOf, milestoneNames, informationNames } from './journal-entries';
export function Journal({ state }: { state: GameState }) {
  const [milestone, setMilestone] = useState<string>(() => milestoneOf(state));
  const [type, setType] = useState('all');
  const entries = journalEntries(state);
  const reached = new Set([milestoneOf(state), ...entries.map((e) => e.milestone)]);
  const visible = entries.filter(
    (e) =>
      (milestone === 'all' || e.milestone === milestone) && (type === 'all' || e.type === type),
  );
  return (
    <div className="journal">
      <p className="muted">Review what you learned, who said it, and what remains unproven.</p>
      <div className="journal-filters">
        <label>
          Milestone
          <select
            aria-label="Milestone"
            value={milestone}
            onChange={(e) => setMilestone(e.target.value)}
          >
            <option value="all">All milestones</option>
            {Object.entries(milestoneNames)
              .filter(([id]) => reached.has(id as keyof typeof milestoneNames))
              .map(([id, label]) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
          </select>
        </label>
        <label>
          Information type
          <select
            aria-label="Information type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="all">All information types</option>
            {Object.entries(informationNames).map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p role="status">{visible.length} records shown.</p>
      {!visible.length && <p>No earned records match these filters.</p>}
      {Object.entries(informationNames).map(([id, label]) => {
        const group = visible.filter((e) => e.type === id);
        return group.length ? (
          <section key={id}>
            <h3>{label}</h3>
            {group.map((e) => (
              <article key={e.id}>
                <h4>{e.title}</h4>
                <p>{e.text}</p>
                <small>Source: {e.source}</small>
                {e.limits && <p className="muted">{e.limits}</p>}
              </article>
            ))}
          </section>
        ) : null;
      })}
    </div>
  );
}
