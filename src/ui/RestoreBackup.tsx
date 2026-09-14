import { useRef, useState } from 'react';
import { decodeSave, MAX_SAVE_BYTES } from '../persistence/saves';
import type { GameState } from '../state/schema';
import { sceneById } from '../content/scenes';
import { milestoneOf, milestoneNames } from './journal-entries';
export function RestoreBackup({
  backup,
  restore,
}: {
  backup: () => void;
  restore: (state: GameState) => void;
}) {
  const [candidate, setCandidate] = useState<GameState | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const selection = useRef(0);
  return (
    <>
      <p>
        Choose a local EVE backup. Nothing is replaced until you confirm the validated location
        below.
      </p>
      <label>
        Save backup file
        <input
          type="file"
          accept=".json,application/json"
          onChange={async (e) => {
            const file = e.target.files?.[0],
              ticket = ++selection.current;
            setCandidate(null);
            setError('');
            setBusy(!!file);
            if (!file) return;
            try {
              if (file.size > MAX_SAVE_BYTES) throw Error('The file exceeds the 2 MB limit.');
              const state = decodeSave(await file.text());
              if (ticket === selection.current) setCandidate(state);
            } catch {
              if (ticket === selection.current)
                setError(
                  'This backup is invalid, unsupported, or exceeds the 2 MB limit. Your current run is unchanged.',
                );
            } finally {
              if (ticket === selection.current) setBusy(false);
            }
          }}
        />
      </label>
      {busy && <p role="status">Checking backup…</p>}
      {error && <p role="alert">{error}</p>}
      {candidate && (
        <section aria-label="Validated backup">
          <h3>{milestoneNames[milestoneOf(candidate)]}</h3>
          <p>{sceneById[candidate.scene + '.' + candidate.phase].title}</p>
          <p>{sceneById[candidate.scene + '.' + candidate.phase].place}</p>
          <p>
            {candidate.revision} committed actions. Restoring replaces the run stored in this
            browser.
          </p>
          <div className="actions">
            <button onClick={backup}>Download current run first</button>
            <button
              className="primary"
              onClick={() => {
                try {
                  restore(candidate);
                } catch (e) {
                  setError(
                    e instanceof Error
                      ? e.message
                      : 'Restore failed. Your current run is unchanged.',
                  );
                }
              }}
            >
              Confirm restore and replace save
            </button>
          </div>
        </section>
      )}
    </>
  );
}
