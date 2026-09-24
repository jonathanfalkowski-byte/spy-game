import type { GameState } from '../state/schema';
import { leverageBoard, type LeverageStatus } from '../content/leverage';
import { displayName } from './reading-presentation';

const statusLabel: Record<LeverageStatus, string> = {
  open: 'Open',
  complied: 'You complied',
  refused: 'You refused',
  countered: 'You found a third way',
};

/** The wall on the back of the wardrobe door: who holds what over Evelynn, and what she holds back.
 * Derived from the save (src/content/leverage.ts); display only. */
export function LeverageBoard({ state }: { state: GameState }) {
  const { held, holds } = leverageBoard(state);
  return (
    <div className="leverage-board">
      <section aria-label="Held over you">
        <h3>Held over you</h3>
        <ul className="leverage-cards">
          {held.map((entry) => (
            <li key={entry.holder} className="leverage-card" data-status={entry.status}>
              <h4>{displayName(entry.holder)}</h4>
              <dl>
                <dt>Holds</dt>
                <dd>{entry.holds.map(displayName).join(' · ')}</dd>
                {entry.wants && (
                  <>
                    <dt>Wants</dt>
                    <dd>{displayName(entry.wants)}</dd>
                  </>
                )}
                {entry.threat && (
                  <>
                    <dt>Threatened</dt>
                    <dd>{displayName(entry.threat)}</dd>
                  </>
                )}
                <dt>Status</dt>
                <dd>{statusLabel[entry.status]}</dd>
              </dl>
              <small>Source: {displayName(entry.source)}</small>
            </li>
          ))}
        </ul>
      </section>
      <section aria-label="What you hold">
        <h3>What you hold</h3>
        {holds.length ? (
          <ul className="leverage-cards">
            {holds.map((asset) => (
              <li key={asset.id} className="leverage-card leverage-asset">
                <h4>{displayName(asset.label)}</h4>
                <small>Source: {displayName(asset.source)}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nothing yet that anyone would be afraid of.</p>
        )}
      </section>
    </div>
  );
}
