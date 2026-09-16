import { chapter3Number, chapter3Progress } from './chapter3-progress';
import { RestoreBackup } from './RestoreBackup';
import { displayName } from './reading-presentation';
import { readSize, writeSize } from '../persistence/preferences';
import { Missionwork, MissionSummary } from './Missionwork';
import { missionSections, missionSection } from '../content/mission';
import { lazy, Suspense, useEffect, useRef, useState, type CSSProperties } from 'react';
import { initialState, reducer, availableChoices, canContinue, nodeOf } from '../state/reducer';
import { inspections, sceneById, sceneBlocks } from '../content/scenes';
import { choiceById } from '../content/dialogue';
import {
  loadGame,
  persist,
  encodeSave,
  SAVE_KEY,
  type LoadResult,
  type StoragePort,
} from '../persistence/saves';
import type { Intent } from '../state/actions';
import { Narrative } from './Narrative';
import { Modal } from './Modal';
import { Journal } from './Journal';
import { Casework } from './Casework';
import { Daywork } from './Daywork';
import { Clinicwork } from './Clinicwork';
import { ClinicConversation } from './ClinicConversation';
import { clinicSections, clinicSection } from '../content/clinic';
import { Chapter3work } from './Chapter3work';
const Inspector = import.meta.env.DEV ? lazy(() => import('./Inspector')) : null;
const browserStorage: StoragePort = {
  getItem: (key) => window.localStorage.getItem(key),
  setItem: (key, value) => window.localStorage.setItem(key, value),
};
function download(raw: string, name: string) {
  const url = URL.createObjectURL(new Blob([raw], { type: 'application/json' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function App({ storage = browserStorage }: { storage?: StoragePort }) {
  const [loaded, setLoaded] = useState<LoadResult>(() => loadGame(storage));
  const [state, setState] = useState(() =>
    loaded.kind === 'ready' ? loaded.state : initialState(),
  );
  const live = useRef(state);
  const lastRaw = useRef(loaded.raw);
  const [saveStatus, setSaveStatus] = useState(
    loaded.kind === 'ready' && loaded.raw ? 'Saved · resumed' : 'New run · no decisions yet',
  );
  const [saveError, setSaveError] = useState('');
  const [modal, setModal] = useState<'journal' | 'history' | 'restart' | 'restore' | null>(null);
  const [textSize, setTextSize] = useState(() => readSize(storage));
  const heading = useRef<HTMLHeadingElement>(null);
  const latestExchange = useRef<HTMLDivElement>(null);
  const previousNode = useRef<string | null>(null);
  const entered = useRef(false);
  const node = nodeOf(state);
  useEffect(() => {
    if (
      entered.current &&
      previousNode.current === node &&
      [
        'clinic',
        'mission',
        'chapter3',
        'file',
        'security',
        'sloane',
        'release',
        'refusal',
        'evening',
        'warning',
        'dayend',
      ].includes(state.scene)
    ) {
      latestExchange.current?.focus({ preventScroll: true });
      latestExchange.current?.scrollIntoView({ block: 'start' });
    } else {
      heading.current?.focus({ preventScroll: true });
      if (entered.current) heading.current?.closest('main')?.scrollIntoView({ block: 'start' });
    }
    previousNode.current = node;
    entered.current = true;
  }, [
    node,
    [
      'clinic',
      'mission',
      'chapter3',
      'file',
      'security',
      'sloane',
      'release',
      'refusal',
      'evening',
      'warning',
      'dayend',
    ].includes(state.scene)
      ? state.revision
      : 0,
  ]);
  function save(next: typeof state) {
    try {
      lastRaw.current = persist(storage, next, lastRaw.current);
      setSaveError('');
      setSaveStatus('Saved · on this browser');
    } catch (e) {
      setSaveStatus('Not saved');
      setSaveError(e instanceof Error ? e.message : String(e));
    }
  }
  function send(intent: Intent) {
    const next = reducer(live.current, { ...intent, expectedRevision: state.revision });
    if (next === live.current) return;
    live.current = next;
    setState(next);
    save(next);
  }
  function restart() {
    // Restart is the only explicit overwrite operation; the dialog offers a backup first.
    try {
      const next = initialState();
      const raw = encodeSave(next);
      storage.setItem(SAVE_KEY, raw);
      lastRaw.current = raw;
      live.current = next;
      setState(next);
      setLoaded({ kind: 'ready', state: next, raw });
      setSaveError('');
      setSaveStatus('Saved · new run');
      setModal(null);
    } catch (e) {
      setSaveError('Restart could not be saved. ' + String(e));
      setSaveStatus('Not saved');
    }
  }
  const recovery = loaded.kind === 'invalid';
  const exportRun = () =>
    download(
      recovery ? (loaded.raw ?? '') : encodeSave(live.current),
      recovery ? 'eve-unreadable-save.json' : 'eve-save-backup.json',
    );
  return (
    <div className="app" style={{ '--reading-size': `${textSize}px` } as CSSProperties}>
      <a className="skip" href="#story">
        Skip to story
      </a>
      <header className="topbar">
        <div className="wordmark">
          EVE<span>A NARROW ASSIGNMENT</span>
        </div>
        <div className="save-label" role="status">
          {recovery ? 'Save needs attention' : saveStatus}
        </div>
      </header>
      {recovery ? (
        <main className="recovery">
          <span className="eyebrow">Resume interrupted</span>
          <h1>We couldn’t read this save.</h1>
          <p>
            Your stored data has been left untouched. Download a copy before starting again. The
            HTML prototype’s saves are separate.
          </p>
          {loaded.raw !== null && <button onClick={exportRun}>Download original save data</button>}
          <button onClick={() => setModal('restart')}>Restart story</button>
          <button onClick={() => location.reload()}>Try loading again</button>
          <button onClick={() => setModal('restore')}>Restore save backup</button>
          {import.meta.env.DEV && <pre>{loaded.error}</pre>}
          {saveError && <p role="alert">{saveError}</p>}
        </main>
      ) : (
        <>
          <div className="layout">
            <aside className="rail">
              <span className="eyebrow">
                {state.scene === 'mission'
                  ? 'Glass House / 03'
                  : state.scene === 'clinic'
                    ? 'Adaptation / 02'
                    : state.scene === 'chapter3' ? (['home','surveillance','complete'].includes(state.phase) ? 'Chapter 3 / Scene 1' : state.contentRevision === 14 ? 'Chapter 3 / Scene '+chapter3Number(state) : 'Chapter 3 / Scene 2') : 'Opening / 01'}
              </span>
              <h2>
                {state.scene === 'mission' ? (
                  'Above the city.'
                ) : state.scene === 'clinic' ? (
                  'Inside Sublevel 17.'
                ) : state.scene === 'chapter3' ? (
                  state.contentRevision === 14 ? 'Second Skin.' : 'Home after Glass House.'
                ) : (
                  <>
                    The shape of
                    <br />
                    an ordinary day.
                  </>
                )}
              </h2>
              <ol className="progress" aria-label="Milestone progress">
                {(state.scene === 'mission'
                  ? (state.mission.completed.includes('home.begin')
                      ? missionSections
                      : missionSections.slice(1)
                    ).map((s, i) => ['mission' + i, s.label])
                  : state.scene === 'clinic'
                    ? clinicSections.map((s, i) => ['clinic' + i, s.label])
                    : state.scene === 'chapter3' ? (['home','surveillance','complete'].includes(state.phase) ? [['chapter3.home', 'The return home'], ['chapter3.surveillance', 'The entry record'], ['chapter3.complete', 'Scene 1 endpoint']] : state.contentRevision === 14 ? chapter3Progress(state) : [['chapter3.mayaContact','What you can tell her'], ['chapter3.mayaTalk','The call'], ['chapter3.mayaClose','Closing the call'], ['chapter3.pressure','The extent of the record'], ['chapter3.mayaFollowup','The follow-up'], ['chapter3.rest','Rest'], ['chapter3.nightComplete','Scene 2 endpoint']]) : [
                        ['apartment', 'At home'],
                        ['office', 'At Axiom'],
                        ['helix', 'The Helix review'],
                        ['maya', 'Coffee with Maya'],
                        ['ending', 'Opening checkpoint'],
                        ...(state.scene === 'ending' || state.day.completed.length
                          ? [
                              ['file', 'The anomaly'],
                              ['security', 'Executive review'],
                              ['sloane', 'The offer'],
                              ['evening', 'The evening'],
                              ['dayend', 'Day zero ending'],
                              ...(state.clinic.completed.length ? [['clinic', 'Sublevel 17']] : []),
                            ]
                          : []),
                      ]
                ).map(([id, label], i) => (
                  <li
                    key={id}
                    aria-current={
                      state.scene === id ||
                      (state.scene === 'chapter3' && id === node) ||
                      (state.scene === 'mission' &&
                        id ===
                          'mission' +
                            missionSection(
                              state.phase,
                              state.mission.completed.includes('home.begin'),
                            )) ||
                      (state.scene === 'clinic' && id === 'clinic' + clinicSection(state.phase)) ||
                      (state.scene === 'commute' && id === 'office') ||
                      (['release', 'refusal'].includes(state.scene) && id === 'sloane') ||
                      (state.scene === 'warning' && id === 'evening')
                        ? 'step'
                        : undefined
                    }
                  >
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    {displayName(label)}
                  </li>
                ))}
              </ol>
              <div className="rail-tools">
                <button onClick={() => setModal('journal')}>
                  Evidence journal <span>{state.facts.length + state.claims.length}</span>
                </button>
                <button onClick={() => setModal('history')}>Conversation history</button>
                <label className="text-control">
                  Reading size
                  <select
                    value={textSize}
                    onChange={(e) => {
                      setTextSize(e.target.value);
                      writeSize(storage, e.target.value);
                    }}
                  >
                    <option value="18">Standard</option>
                    <option value="21">Large</option>
                    <option value="24">Extra large</option>
                  </select>
                </label>
                <button onClick={() => setModal('restore')}>Restore save backup</button>
                <button className="subtle" onClick={() => setModal('restart')}>
                  Restart story
                </button>
              </div>
              <p className="rail-note">
                Read. Interpret. Decide.
                <br />
                There is no timer on your choices.
              </p>
            </aside>
            <main id="story" className="story">
              <span className="eyebrow">{sceneById[node].place}</span>
              <h1 ref={heading} tabIndex={-1}>
                {displayName(sceneById[node].title)}
              </h1>
              <div className="chapter-line" />
              {saveError && (
                <div className="save-error" role="alert">
                  <strong>Your latest decisions are not saved.</strong>
                  <p>{saveError}</p>
                  <button onClick={() => save(live.current)}>Retry save</button>
                  <button onClick={exportRun}>Download this run</button>
                  <button onClick={() => location.reload()}>Reload saved run</button>
                </div>
              )}
              {state.feedback &&
                ![
                  'clinic',
                  'mission',
                  'file',
                  'security',
                  'sloane',
                  'release',
                  'refusal',
                  'evening',
                  'warning',
                  'dayend',
                ].includes(state.scene) && (
                  <div className="confirmation" role="status">
                    <span aria-hidden="true">✓</span>
                    <p>
                      {[
                        'clinic',
                        'mission',
                        'file',
                        'security',
                        'sloane',
                        'release',
                        'refusal',
                        'evening',
                        'warning',
                        'dayend',
                      ].includes(state.scene)
                        ? state.feedback.replace(/^Recorded: /, '')
                        : state.feedback}
                    </p>
                  </div>
                )}
              {[
                'clinic',
                'mission',
                'chapter3',
                'file',
                'security',
                'sloane',
                'release',
                'refusal',
                'evening',
                'warning',
                'dayend',
              ].includes(state.scene) ? (
                <ClinicConversation state={state} latest={latestExchange} />
              ) : (
                <Narrative blocks={sceneBlocks(state)} />
              )}
              {state.scene === 'apartment' && (
                <section className="apartment-inspections">
                  <h2>
                    Look around <span className="muted">· optional</span>
                  </h2>
                  <div className="inspection-grid">
                    {inspections.map((i) => (
                      <div key={i.id}>
                        <button
                          disabled={state.inspected.includes(i.id)}
                          onClick={() => send({ type: 'INSPECT_APARTMENT', id: i.id })}
                        >
                          {i.title}
                          <small>{state.inspected.includes(i.id) ? 'Observed' : 'Inspect'}</small>
                        </button>
                        {state.inspected.includes(i.id) && <p>{i.text}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              )}
              {node === 'apartment.bond' && (
                <p className="notice">
                  Choose Adrian’s private feelings today. This does not lock a romance route or tell
                  Maya what he feels.
                </p>
              )}
              {!!availableChoices(state).length && (
                <section className="decision">
                  <span className="eyebrow">
                    {node === 'apartment.bond' ? 'What does Adrian feel?' : 'Your response'}
                  </span>
                  <div className="choice-list">
                    {availableChoices(state).map((c, i) => (
                      <button
                        key={c.id}
                        data-choice={c.id}
                        onClick={() => send({ type: 'CHOOSE_DIALOGUE', id: c.id })}
                      >
                        <span className="choice-number">{String(i + 1).padStart(2, '0')}</span>
                        <span className="choice-copy">
                          {displayName(c.label)}
                          <small>{displayName(c.hint)}</small>
                        </span>
                        <span className="choice-arrow" aria-hidden="true">
                          ↗
                        </span>
                      </button>
                    ))}
                  </div>
                </section>
              )}
              <Casework state={state} send={send} />
              <Daywork state={state} send={send} />
              {state.scene === 'chapter3' && <Chapter3work state={state} send={send} />}
              <Clinicwork state={state} send={send} />
              <Missionwork state={state} send={send} />
              {state.mission.outcome === 'complete' && state.contentRevision !== 14 && (
                <section className="ending-summary">
                  <span className="tag">Glass House complete</span>
                  <MissionSummary state={state} />
                  <div className="actions">
                    <button onClick={() => setModal('journal')}>Review your evidence</button>
                    <button onClick={() => setModal('history')}>Review conversation history</button>
                    <button onClick={exportRun}>Download save backup</button>
                    {state.phase === 'accepted' && state.day.outcome === 'accepted' && state.mission.outcome === 'complete' && state.clinic.outcome === 'departed' && (
                      <button onClick={() => send({ type: 'CONTINUE_CHAPTER3' })}>Continue to Chapter 3</button>
                    )}
                  </div>
                </section>
              )}
              {state.scene === 'clinic' && ['complete', 'stopped'].includes(state.phase) && (
                <section className="ending-summary">
                  <span className="tag">Decisions retained</span>
                  <h2>
                    {state.clinic.outcome === 'stopped'
                      ? 'Recovery, with treatment stopped'
                      : 'Your preparation on record'}
                  </h2>
                  <p>
                    {
                      {
                        unchanged: 'Adaptation has not begun.',
                        voice: 'Your voice has changed; further adaptation has stopped.',
                        face: 'Your voice and face have changed; further adaptation has stopped.',
                        complete: 'Stage One is complete.',
                      }[state.clinic.stage]
                    }{' '}
                    {state.clinic.outcome === 'stopped'
                      ? 'No further adaptation. Discharge arrangements pending.'
                      : 'The Glass House remains ahead.'}
                  </p>
                  {state.clinic.profile && <p>Profile: {state.clinic.profile}.</p>}
                  {state.clinic.outfit && (
                    <p>
                      Presentation: {state.clinic.outfit} / {state.clinic.makeup}.
                    </p>
                  )}
                  <p>
                    {state.clinic.contact === 'identity'
                      ? 'Maya received your explicit description of the adaptation.'
                      : state.clinic.contact === 'brief'
                        ? 'Maya received a recovery update without the identity details.'
                        : 'You sent no recovery disclosure to Maya.'}
                  </p>
                  <p>
                    {state.day.employment === 'terminated'
                      ? 'Employment remains terminated. Existing housing notice dates are not reset.'
                      : 'Office access remains suspended.'}
                  </p>
                  <div className="actions">
                    <button onClick={() => setModal('journal')}>Review your evidence</button>
                    <button onClick={() => setModal('history')}>Review conversation history</button>
                    <button onClick={exportRun}>Download save backup</button>
                    {state.clinic.outcome === 'departed' && state.day.outcome === 'accepted' && state.mission.outcome === 'complete' && (
                      <button onClick={() => send({ type: 'CONTINUE_CHAPTER3' })}>Continue to Chapter 3</button>
                    )}
                  </div>
                </section>
              )}
              {sceneById[node].next && (
                <div className="continue-row">
                  <button
                    className="primary"
                    disabled={!canContinue(state)}
                    onClick={() => send({ type: 'CONTINUE' })}
                  >
                    {sceneById[node].continueLabel} <span aria-hidden="true">→</span>
                  </button>
                </div>
              )}
              {state.scene === 'ending' && (
                <section className="ending-summary">
                  <span className="tag">Decisions retained</span>
                  <h2>What remains</h2>
                  <p>{state.report?.text}</p>
                  <p>{state.report?.feedback}</p>
                  <p>
                    {choiceById[state.choices.invitation]?.value === 'yes'
                      ? 'You promised Maya eight o’clock.'
                      : choiceById[state.choices.invitation]?.value === 'maybe'
                        ? 'Tonight’s invitation remains open.'
                        : 'You declined tonight’s invitation.'}
                  </p>
                  <p>
                    {choiceById[state.choices.disclosure]?.value === 'voss'
                      ? 'Maya knows about the personnel connection you disclosed.'
                      : choiceById[state.choices.disclosure]?.value === 'contradiction'
                        ? 'Maya knows why you questioned the patent rationale.'
                        : 'You kept the case findings private.'}
                  </p>
                  <div className="actions">
                    <button onClick={() => setModal('journal')}>Review your evidence</button>
                    <button onClick={exportRun}>Download save backup</button>
                    <button onClick={() => setModal('history')}>Review conversation history</button>
                  </div>
                </section>
              )}
              {state.scene === 'dayend' && (
                <section className="ending-summary">
                  <span className="tag">Decisions retained</span>
                  <h2>Your day on record</h2>
                  {state.day.outcome === 'accepted' && (
                    <p>
                      {state.day.evening === 'avoid'
                        ? 'You cancelled the evening and stayed home.'
                        : state.day.closure === 'checkin'
                          ? 'Maya will call you at 06:30 and knows to look for Sublevel 17 if you do not answer.'
                          : state.day.closure === 'evelyn'
                            ? 'Maya knows the proposed adaptation and Evelynn’s name.'
                            : 'You asked Maya not to become more involved; she retains what you already shared.'}
                    </p>
                  )}
                  <p>
                    {state.day.outcome === 'cautious'
                      ? 'You withheld biometric authorization. Your earlier plans remain unchanged.'
                      : state.day.outcome === 'walkaway'
                        ? 'You refused the operation and left Axiom. Maya heard your call.'
                        : 'You accepted under coercion. The clinic appointment remains ahead.'}
                  </p>
                  <p>
                    {state.day.employment === 'terminated'
                      ? 'Employment: terminated. Housing subsidy: thirty-day notice.'
                      : state.day.outcome === 'accepted'
                        ? 'Work access remains suspended. Your temporary badge permits transit and residential access.'
                        : 'No detention or employment consequence has occurred on this route.'}
                  </p>
                  <div className="actions">
                    <button onClick={() => setModal('journal')}>Review your evidence</button>
                    <button onClick={() => setModal('history')}>Review conversation history</button>
                    <button onClick={exportRun}>Download save backup</button>
                  </div>
                </section>
              )}
              {Inspector && (
                <Suspense fallback={null}>
                  <Inspector state={state} />
                </Suspense>
              )}
              <footer className="story-footer">
                EVE /{' '}
                {state.scene === 'mission'
                  ? state.phase === 'home'
                    ? 'HOME RESET'
                    : 'GLASS HOUSE'
                  : state.scene === 'clinic'
                    ? 'SUBLEVEL 17'
                    : state.scene === 'chapter3' ? (['home','surveillance','complete'].includes(state.phase) ? 'CHAPTER 3 · SCENE 1' : state.contentRevision === 14 ? 'CHAPTER 3 · SCENE '+chapter3Number(state) : 'CHAPTER 3 · SCENE 2') : 'ADRIAN’S DAY'}
                <span>Every judgment leaves a record.</span>
              </footer>
            </main>
          </div>
        </>
      )}
      {modal === 'journal' && (
        <Modal title="Evidence journal" onClose={() => setModal(null)}>
          <Journal state={state} />
        </Modal>
      )}
      {modal === 'history' && (
        <Modal title="Conversation history" onClose={() => setModal(null)}>
          <div className="history">
            {state.history.map((h, i) => (
              <section key={i}>
                <h3>{sceneById[h.node].place}</h3>
                <Narrative blocks={h.blocks} node={h.node} />
              </section>
            ))}
          </div>
        </Modal>
      )}
      {modal === 'restore' && (
        <Modal title="Restore save backup" onClose={() => setModal(null)}>
          <RestoreBackup
            backup={exportRun}
            restore={(next) => {
              const raw = persist(storage, next, lastRaw.current);
              lastRaw.current = raw;
              live.current = next;
              setState(next);
              setLoaded({ kind: 'ready', state: next, raw });
              setSaveError('');
              setSaveStatus('Saved · backup restored');
              previousNode.current = null;
              setModal(null);
            }}
          />
        </Modal>
      )}
      {modal === 'restart' && (
        <Modal title="Restart from the apartment?" onClose={() => setModal(null)}>
          <p>
            This replaces the entire production story save with a new run from the apartment. The
            reference prototype and its saves remain unchanged.
          </p>
          <div className="actions">
            <button onClick={exportRun} disabled={recovery && loaded.raw === null}>
              Download a backup first
            </button>
            <button className="danger" onClick={restart}>
              Restart and replace save
            </button>
          </div>
          {saveError && <p role="alert">{saveError}</p>}
        </Modal>
      )}
    </div>
  );
}
