import { assessmentStatus, assessmentLabels } from './assessment-status';
import { isCurrentAuthoringRevision, hasRevision18Presentation } from '../content/revision';
import { readFade, readNavigation, writeFade, writeNavigation } from './reader-preferences';
import { SceneArtStage } from './SceneArtStage';
import { openingReadingTitle } from './opening-beats';
import { resolveSceneArt, validateSceneShot, type SceneArt } from './scene-art';
import { useMediaQuery } from './useMediaQuery';
import { canContinueAudit } from '../state/audit-continuation';
import { Chapter5work } from './Chapter5work';
import { Chapter6work } from './Chapter6work';
import { chapter6Scenes } from '../content/chapter6';
import { Chapter7work } from './Chapter7work';
import { chapter7Scenes } from '../content/chapter7';
import { Chapter8work } from './Chapter8work';
import { chapter8Scenes } from '../content/chapter8';
import { Chapter9work } from './Chapter9work';
import { chapter9Scenes } from '../content/chapter9';
import { Chapter10work } from './Chapter10work';
import { chapter10Scenes } from '../content/chapter10';
import { Chapter11work } from './Chapter11work';
import { chapter11Scenes } from '../content/chapter11';
import { Chapter12work } from './Chapter12work';
import { chapter12Scenes } from '../content/chapter12';
import { Chapter13work } from './Chapter13work';
import { chapter13Scenes } from '../content/chapter13';
import { Chapter14work } from './Chapter14work';
import { chapter14Scenes } from '../content/chapter14';
import { FadeCoercionContext } from './reader-context';
import { LeverageBoard } from './LeverageBoard';
import { leverageBoardOpen } from '../content/leverage';
import { chapter5Scenes } from '../content/chapter5';
import { conversationHistory, currentPlace } from './chapter4-presentation';
import { Chapter4work } from './Chapter4work';
import { chapter4Scenes } from '../content/chapter4';
import { chapter3Number, chapter3Progress } from './chapter3-progress';
import { RestoreBackup } from './RestoreBackup';
import { displayName, renderChoiceText, renderCurrentPresentationText } from './reading-presentation';
import { readSize, writeSize } from '../persistence/preferences';
import { Missionwork, MissionSummary } from './Missionwork';
import { missionSections, missionSection } from '../content/mission';
import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import { newGameState, reducer, availableChoices, canContinue, nodeOf } from '../state/reducer';
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
    loaded.kind === 'ready' ? loaded.state : newGameState(),
  );
  const live = useRef(state);
  const lastRaw = useRef(loaded.raw);
  const [saveStatus, setSaveStatus] = useState(
    loaded.kind === 'ready' && loaded.raw ? 'Saved · resumed' : 'New run · no decisions yet',
  );
  const [saveError, setSaveError] = useState('');
  const [modal, setModal] = useState<
    'journal' | 'history' | 'leverage' | 'assessment' | 'restart' | 'restore' | 'navigation' | null
  >(null);
  const [textSize, setTextSize] = useState(() => readSize(storage));
  const [fadeCoercion, setFadeCoercion] = useState(() => readFade(storage));
  const heading = useRef<HTMLHeadingElement>(null);
  const latestExchange = useRef<HTMLDivElement>(null);
  const previousNode = useRef<string | null>(null);
  const entered = useRef(false);
  const node = nodeOf(state);
  const assessment = assessmentStatus(state);
  const requiredKey = assessment.status === 'required' ? assessment.key : null;
  const [pulseKey, setPulseKey] = useState<string | null>(null);
  useEffect(() => {
    setPulseKey(requiredKey);
    if (!requiredKey) return;
    const timeout = setTimeout(() => setPulseKey(null), 3600);
    return () => clearTimeout(timeout);
  }, [requiredKey]);
  const previousAssessment = useRef(assessment.status);
  const [assessmentConfirmation, setAssessmentConfirmation] = useState(false);
  useEffect(() => {
    const committed =
      previousAssessment.current !== 'completed' && assessment.status === 'completed';
    previousAssessment.current = assessment.status;
    setAssessmentConfirmation(committed);
    if (!committed) return;
    const timeout = setTimeout(() => setAssessmentConfirmation(false), 5000);
    return () => clearTimeout(timeout);
  }, [assessment.status]);
  const assessmentEntry = (
    <button
      className={
        'assessment-entry assessment-entry--' +
        assessment.status +
        (pulseKey === requiredKey && requiredKey ? ' assessment-pulse' : '')
      }
      data-assessment-status={assessment.status}
      aria-haspopup="dialog"
      onClick={() => setModal('assessment')}
    >
      {assessmentLabels[assessment.status]}
    </button>
  );
  // A read cursor belongs to one immutable state snapshot, never to the persisted story.
  const [readingCursor, setReadingCursor] = useState<{ state: typeof state; position: number }>();
  const readingPosition = readingCursor?.state === state ? readingCursor.position : 0;
  const visual = useMemo(() => resolveSceneArt(state, readingPosition), [state, readingPosition]);
  const compactNavigation = useMediaQuery('(max-width: 1199px)');
  const narrowerDesktop = useMediaQuery('(max-width: 1399px)');
  const [navigationPreference, setNavigationPreference] = useState(() => readNavigation(storage));
  const [failedSource, setFailedSource] = useState<string>();
  const displayedArt = visual.art?.asset.src === failedSource ? undefined : visual.art;
  const navigationCollapsed = navigationPreference ?? (narrowerDesktop && !!displayedArt);
  function toggleNavigation() {
    setNavigationPreference(!navigationCollapsed);
    writeNavigation(storage, !navigationCollapsed);
  }
  const canHoldArt = useCallback(
    (art: SceneArt) => {
      if (validateSceneShot(state, art).length) return false;
      if (!visual.reading) return true;
      const previousIndex = visual.reading.beats.findIndex((beat) => beat.shotId === art.shotId);
      return previousIndex >= 0 && previousIndex <= readingPosition;
    },
    [state, visual.reading, readingPosition],
  );
  useEffect(() => {
    if (!compactNavigation && !navigationCollapsed && modal === 'navigation') setModal(null);
  }, [compactNavigation, navigationCollapsed, modal]);
  const readingScene = !!visual.reading && readingPosition < visual.reading.beats.length - 1;
  const previousShot = useRef<string | undefined>(undefined);
  function readMoment(position: number) {
    setReadingCursor({ state, position });
    requestAnimationFrame(() => {
      document
        .querySelector<HTMLElement>('[aria-label="Harbour scene"], [aria-label="Opening scene"]')
        ?.focus({ preventScroll: true });
      document
        .querySelector('.scene-art-stage, [aria-label="Harbour scene"], [aria-label="Opening scene"]')
        ?.closest('.reader')
        ?.querySelector('.story')
        ?.scrollTo({ top: 0 });
    });
  }
  useEffect(() => {
    if (modal === 'assessment') {
      document.querySelector<HTMLDialogElement>('dialog')?.focus({ preventScroll: true });
      previousNode.current = node;
      previousShot.current = visual.shot?.shotId;
      entered.current = true;
      return;
    }
    if (
      entered.current &&
      !(visual.art && previousShot.current !== visual.shot?.shotId) &&
      previousNode.current === node &&
      [
        'clinic',
        'mission',
        'chapter3',
        'chapter4',
        'chapter5',
        'chapter6',
        'chapter7',
        'chapter8',
        'chapter9',
        'chapter10',
        'chapter11',
        'chapter12',
        'chapter13',
        'chapter14',
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
      if (entered.current) {
        heading.current?.closest('.story')?.scrollTo({ top: 0 });
        heading.current?.closest('main')?.scrollIntoView({ block: 'start' });
      }
    }
    previousNode.current = node;
    previousShot.current = visual.shot?.shotId;
    entered.current = true;
  }, [
    node,
    [
      'clinic',
      'mission',
      'chapter3',
      'chapter4',
      'chapter5',
      'chapter6',
      'chapter7',
      'chapter8',
      'chapter9',
      'chapter10',
      'chapter11',
      'chapter12',
      'chapter13',
      'chapter14',
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
    if (
      (intent.type === 'MISSION_CHOOSE' && intent.id === 'assess.begin') ||
      intent.type === 'REVIEW_ASSESSMENT'
    )
      setModal('assessment');
    if (
      intent.type === 'SUBMIT_ASSESSMENT' ||
      (intent.type === 'MISSION_CHOOSE' && intent.id === 'source.confirm')
    )
      setModal(null);
  }
  function restart() {
    // Restart is the only explicit overwrite operation; the dialog offers a backup first.
    try {
      const next = newGameState();
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
  const navigation = (
    <nav aria-label="Story navigation">
      <h3 className="nav-section">Story</h3>
      <span className="eyebrow">
        {state.scene === 'mission'
          ? 'Glass House / 03'
          : state.scene === 'clinic'
            ? 'Adaptation / 02'
            : state.scene === 'chapter14'
              ? 'Chapter 14 / Sloane’s Turn'
            : state.scene === 'chapter13'
              ? 'Chapter 13 / The Honeypot'
            : state.scene === 'chapter12'
              ? 'Chapter 12 / Singapore'
            : state.scene === 'chapter11'
              ? 'Chapter 11 / The Asset'
            : state.scene === 'chapter10'
              ? 'Chapter 10 / She Knows'
              : state.scene === 'chapter9'
              ? 'Chapter 9 / Assembling the Case'
              : state.scene === 'chapter8'
              ? 'Chapter 8 / The Cost Bites'
              : state.scene === 'chapter7'
              ? 'Chapter 7 / The Road You Choose'
              : state.scene === 'chapter6'
              ? 'Chapter 6 / The Cage You Choose'
              : state.scene === 'chapter5'
              ? 'Chapter 5 / The Beautiful Life'
              : state.scene === 'chapter4'
                ? 'Chapter 4 / Private Access'
                : state.scene === 'chapter3'
                  ? ['home', 'surveillance', 'complete'].includes(state.phase)
                    ? 'Chapter 3 / Scene 1'
                    : state.contentRevision === 14 || isCurrentAuthoringRevision(state.contentRevision)
                      ? 'Chapter 3 / Scene ' + chapter3Number(state)
                      : 'Chapter 3 / Scene 2'
                  : 'Opening / 01'}
      </span>
      <h2>
        {state.scene === 'mission' ? (
          'Above the city.'
        ) : state.scene === 'clinic' ? (
          'Inside Sublevel 17.'
        ) : state.scene === 'chapter14' ? (
          'Sloane’s Turn.'
        ) : state.scene === 'chapter13' ? (
          'The Honeypot.'
        ) : state.scene === 'chapter12' ? (
          'Singapore.'
        ) : state.scene === 'chapter11' ? (
          'The Asset.'
        ) : state.scene === 'chapter10' ? (
          'She Knows.'
        ) : state.scene === 'chapter9' ? (
          'Assembling the Case.'
        ) : state.scene === 'chapter8' ? (
          'The Cost Bites.'
        ) : state.scene === 'chapter7' ? (
          state.choices['route.lane'] === 'own-power' ? 'Standing Alone.' : 'The Road You Choose.'
        ) : state.scene === 'chapter6' ? (
          'The Cage You Choose.'
        ) : state.scene === 'chapter5' ? (
          'The Beautiful Life.'
        ) : state.scene === 'chapter4' ? (
          'Private Access.'
        ) : state.scene === 'chapter3' ? (
          state.contentRevision === 14 || isCurrentAuthoringRevision(state.contentRevision) ? (
            'Second Skin.'
          ) : (
            'Home after Glass House.'
          )
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
            : state.scene === 'chapter14'
              ? chapter14Scenes.map((s) => [s.id, s.title])
            : state.scene === 'chapter13'
              ? chapter13Scenes.map((s) => [s.id, s.title])
            : state.scene === 'chapter12'
              ? chapter12Scenes.map((s) => [s.id, s.title])
            : state.scene === 'chapter11'
              ? chapter11Scenes.map((s) => [s.id, s.title])
            : state.scene === 'chapter10'
              ? chapter10Scenes.map((s) => [s.id, s.title])
              : state.scene === 'chapter9'
              ? chapter9Scenes.map((s) => [s.id, s.title])
              : state.scene === 'chapter8'
              ? chapter8Scenes.map((s) => [s.id, s.title])
              : state.scene === 'chapter7'
              ? chapter7Scenes.map((s) => [s.id, s.title])
              : state.scene === 'chapter6'
              ? chapter6Scenes.map((s) => [s.id, s.title])
              : state.scene === 'chapter5'
              ? chapter5Scenes.map((s) => [s.id, s.title])
              : state.scene === 'chapter4'
                ? chapter4Scenes.map((s) => [s.id, s.title])
                : state.scene === 'chapter3'
                  ? ['home', 'surveillance', 'complete'].includes(state.phase)
                    ? [
                        ['chapter3.home', 'The return home'],
                        ['chapter3.surveillance', 'The entry record'],
                        ['chapter3.complete', 'Scene 1 endpoint'],
                      ]
                    : state.contentRevision === 14 || isCurrentAuthoringRevision(state.contentRevision)
                      ? chapter3Progress(state)
                      : [
                          ['chapter3.mayaContact', 'What you can tell her'],
                          ['chapter3.mayaTalk', 'The call'],
                          ['chapter3.mayaClose', 'Closing the call'],
                          ['chapter3.pressure', 'The extent of the record'],
                          ['chapter3.mayaFollowup', 'The follow-up'],
                          ['chapter3.rest', 'Rest'],
                          ['chapter3.nightComplete', 'Scene 2 endpoint'],
                        ]
                  : [
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
              (['chapter3', 'chapter4', 'chapter5', 'chapter6', 'chapter7', 'chapter8', 'chapter9', 'chapter10', 'chapter11', 'chapter12', 'chapter13', 'chapter14'].includes(state.scene) && id === node) ||
              (state.scene === 'mission' &&
                id ===
                  'mission' +
                    missionSection(state.phase, state.mission.completed.includes('home.begin'))) ||
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
        <h3 className="nav-section">Records</h3>
        {assessmentEntry}
        <button onClick={() => setModal('journal')}>
          Evidence journal <span>{state.facts.length + state.claims.length}</span>
        </button>
        <button onClick={() => setModal('history')}>Conversation history</button>
        {leverageBoardOpen(state) && <button onClick={() => setModal('leverage')}>Leverage board</button>}
        <h3 className="nav-section">Settings</h3>
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
        <label className="text-control">
          <input
            type="checkbox"
            checked={fadeCoercion}
            onChange={(e) => {
              setFadeCoercion(e.target.checked);
              writeFade(storage, e.target.checked);
            }}
          />
          Fade coercion scenes
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
    </nav>
  );
  return (
    <FadeCoercionContext.Provider value={fadeCoercion}>
    <div className="app" style={{ '--reading-size': `${textSize}px` } as CSSProperties}>
      <a className="skip" href="#story">
        Skip to story
      </a>
      <header className="topbar">
        <div className="wordmark">
          EVE
          <span>{state.scene === 'chapter14' ? 'SLOANE’S TURN' : state.scene === 'chapter13' ? 'THE HONEYPOT' : state.scene === 'chapter12' ? 'SINGAPORE' : state.scene === 'chapter11' ? 'THE ASSET' : state.scene === 'chapter10' ? 'SHE KNOWS' : state.scene === 'chapter9' ? 'ASSEMBLING THE CASE' : state.scene === 'chapter8' ? 'THE COST BITES' : state.scene === 'chapter7' ? 'THE ROAD YOU CHOOSE' : state.scene === 'chapter6' ? 'THE CAGE YOU CHOOSE' : state.scene === 'chapter5' ? 'THE BEAUTIFUL LIFE' : 'A NARROW ASSIGNMENT'}</span>
        </div>
        {compactNavigation && !recovery && assessmentEntry}
        {compactNavigation && !recovery && (
          <button
            className="navigation-toggle"
            aria-haspopup="dialog"
            aria-expanded={modal === 'navigation'}
            onClick={() => setModal('navigation')}
          >
            Menu
          </button>
        )}
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
          <div className={`layout${navigationCollapsed ? ' layout--nav-collapsed' : ''}`}>
            {!compactNavigation && (
              <aside className={`rail${navigationCollapsed ? ' rail--collapsed' : ''}`}>
                <button
                  className="rail-collapse"
                  onClick={toggleNavigation}
                  aria-label={navigationCollapsed ? 'Expand navigation' : 'Collapse navigation'}
                  aria-expanded={!navigationCollapsed}
                  title={navigationCollapsed ? 'Expand navigation' : 'Collapse navigation'}
                >
                  <span aria-hidden="true">{navigationCollapsed ? '»' : '«'}</span>
                  {!navigationCollapsed && 'Collapse navigation'}
                </button>
                {navigationCollapsed ? (
                  <>
                    {assessmentEntry}
                    <button
                      className="rail-menu"
                      aria-haspopup="dialog"
                      onClick={() => setModal('navigation')}
                    >
                      Menu
                    </button>
                  </>
                ) : (
                  navigation
                )}
              </aside>
            )}
            <main
              id="story"
              className={`reader ${displayedArt ? 'reader--illustrated' : 'reader--text'}`}
            >
              {displayedArt && (
                <div className="cinematic-stage">
                  <SceneArtStage
                    art={displayedArt}
                    canHold={canHoldArt}
                    onUnavailable={setFailedSource}
                  />
                </div>
              )}
              <div
                className={`story ${displayedArt ? 'story--illustrated' : 'story--text'}`}
                role="region"
                aria-label="Story text"
                tabIndex={0}
              >
                <div className="story-content">
                  <span className="eyebrow">
                    {displayName(renderCurrentPresentationText(currentPlace(state, sceneById[node].place), node, state.contentRevision))}
                  </span>
                  <h1 ref={heading} tabIndex={-1}>
                    {displayName(
                      renderCurrentPresentationText(
                        (state.scene === 'commute' && openingReadingTitle(visual.shot?.shotId)) ||
                          sceneById[node].title,
                        node,
                        state.contentRevision,
                      ),
                    )}
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
                    !(
                      hasRevision18Presentation(state.contentRevision) &&
                      state.feedback === 'Chapter 3 continuation recorded. The historical day remains unchanged.'
                    ) &&
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
                            ? displayName(state.feedback.replace(/^Recorded: /, ''))
                            : displayName(state.feedback)}
                        </p>
                      </div>
                    )}
                  {[
                    'clinic',
                    'mission',
                    'chapter3',
                    'chapter4',
                    'chapter5',
                    'chapter6',
                    'chapter7',
                    'chapter8',
                    'chapter9',
                    'chapter10',
                    'chapter11',
                    'chapter12',
                    'chapter13',
                    'chapter14',
                    'file',
                    'security',
                    'sloane',
                    'release',
                    'refusal',
                    'evening',
                    'warning',
                    'dayend',
                    'commute',
                  ].includes(state.scene) ? (
                    <ClinicConversation
                      state={state}
                      latest={latestExchange}
                      reading={visual.reading}
                      readingPosition={readingPosition}
                      onReadMoment={readMoment}
                      illustrated={!!displayedArt}
                    />
                  ) : (
                    <Narrative blocks={sceneBlocks(state)} node={node} contentRevision={state.contentRevision} />
                  )}
                  {canContinueAudit(state) && !readingScene && (
                    <section className="decision" aria-label="Story revision continuation">
                      <p>
                        Updated Chapters 3–5 are available. Continue with the revised choices from
                        here; your earlier decisions and history stay intact.
                      </p>
                      <button onClick={() => send({ type: 'CONTINUE_AUDIT_REVISION' })}>
                        Continue with revised Chapters 3–5
                      </button>
                      <small>
                        You can keep playing this saved edition using its existing choices below.
                      </small>
                    </section>
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
                              {displayName(i.title)}
                              <small>
                                {state.inspected.includes(i.id) ? 'Observed' : 'Inspect'}
                              </small>
                            </button>
                            {state.inspected.includes(i.id) && <p>{displayName(i.text)}</p>}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                  {node === 'apartment.bond' && (
                    <p className="notice">
                      Choose Adrian’s private feelings today. This does not lock a romance route or
                      tell Maya what he feels.
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
                              {displayName(renderChoiceText(c.label, node, state.contentRevision))}
                              <small>{displayName(renderChoiceText(c.hint, node, state.contentRevision))}</small>
                            </span>
                            <span className="choice-arrow" aria-hidden="true">
                              ↗
                            </span>
                          </button>
                        ))}
                      </div>
                    </section>
                  )}
                  {assessment.status === 'required' && (
                    <section className="assessment-notice" aria-label="Assessment required">
                      <strong>⚠ Assessment required</strong>
                      <p>Review the available evidence and commit your conclusion.</p>
                      <button className="primary" onClick={() => setModal('assessment')}>
                        Open assessment
                      </button>
                      <small>Commit an assessment before progressing beyond this decision.</small>
                    </section>
                  )}
                  {assessmentConfirmation && (
                    <p className="assessment-confirmation" role="status">
                      ✓ Assessment recorded
                    </p>
                  )}
                  {node === 'helix.submitted' && (
                    <button onClick={() => setModal('assessment')}>Review assessment</button>
                  )}
                  <Casework state={state} send={send} />
                  <Daywork state={state} send={send} />
                  {state.scene === 'chapter3' && <Chapter3work state={state} send={send} />}
                  <Chapter4work state={state} send={send} />
                  {!readingScene && <Chapter5work state={state} send={send} />}
                  {!readingScene && <Chapter6work state={state} send={send} />}
                  {!readingScene && <Chapter7work state={state} send={send} />}
                  {!readingScene && <Chapter8work state={state} send={send} />}
                  {!readingScene && <Chapter9work state={state} send={send} />}
                  {!readingScene && <Chapter10work state={state} send={send} />}
                  {!readingScene && <Chapter11work state={state} send={send} />}
                  {!readingScene && <Chapter12work state={state} send={send} />}
                  {!readingScene && <Chapter13work state={state} send={send} />}
                  {!readingScene && <Chapter14work state={state} send={send} />}
                  <Clinicwork state={state} send={send} />
                  {!(assessment.status === 'required' && assessment.flow === 'mission') && (
                    <Missionwork state={state} send={send} />
                  )}
                  {state.mission.outcome === 'complete' && (state.contentRevision ?? 11) < 14 && (
                    <section className="ending-summary">
                      <span className="tag">Glass House complete</span>
                      <p>Glass House assessment updated</p>
                      <button onClick={() => setModal('assessment')}>Review assessment</button>
                      <div className="actions">
                        <button onClick={() => setModal('journal')}>Review your evidence</button>
                        <button onClick={() => setModal('history')}>
                          Review conversation history
                        </button>
                        <button onClick={exportRun}>Download save backup</button>
                        {state.phase === 'accepted' &&
                          state.day.outcome === 'accepted' &&
                          state.mission.outcome === 'complete' &&
                          state.clinic.outcome === 'departed' && (
                            <button onClick={() => send({ type: 'CONTINUE_CHAPTER3' })}>
                              Continue to Chapter 3
                            </button>
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
                        <button onClick={() => setModal('history')}>
                          Review conversation history
                        </button>
                        <button onClick={exportRun}>Download save backup</button>
                        {state.clinic.outcome === 'departed' &&
                          state.day.outcome === 'accepted' &&
                          state.mission.outcome === 'complete' && (
                            <button onClick={() => send({ type: 'CONTINUE_CHAPTER3' })}>
                              Continue to Chapter 3
                            </button>
                          )}
                      </div>
                    </section>
                  )}
                  {sceneById[node].next && !readingScene && (
                    <div className="continue-row">
                      <button
                        className="primary"
                        disabled={!canContinue(state)}
                        onClick={() => send({ type: 'CONTINUE' })}
                      >
                        {displayName(renderCurrentPresentationText(sceneById[node].continueLabel ?? '', node, state.contentRevision))}{' '}
                        <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  )}
                  {state.scene === 'ending' && (
                    <section className="ending-summary">
                      <span className="tag">Decisions retained</span>
                      <h2>What remains</h2>
                      <p>{state.report?.text && displayName(state.report.text)}</p>
                      <p>{state.report?.feedback && displayName(state.report.feedback)}</p>
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
                        <button onClick={() => setModal('history')}>
                          Review conversation history
                        </button>
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
                        <button onClick={() => setModal('history')}>
                          Review conversation history
                        </button>
                        <button onClick={exportRun}>Download save backup</button>
                      </div>
                    </section>
                  )}
                  {Inspector && (
                    <Suspense fallback={null}>
                      <Inspector
                        state={state}
                        visual={{
                          shotId: visual.shot?.shotId,
                          assetId: visual.art?.asset.id,
                          issues: visual.issues,
                        }}
                      />
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
                        : state.scene === 'chapter14'
                          ? 'Chapter 14 / Sloane’s Turn'
                        : state.scene === 'chapter13'
                          ? 'Chapter 13 / The Honeypot'
                        : state.scene === 'chapter12'
                          ? 'Chapter 12 / Singapore'
                        : state.scene === 'chapter11'
                          ? 'Chapter 11 / The Asset'
                        : state.scene === 'chapter10'
                          ? 'Chapter 10 / She Knows'
                          : state.scene === 'chapter9'
                          ? 'Chapter 9 / Assembling the Case'
                          : state.scene === 'chapter8'
                          ? 'Chapter 8 / The Cost Bites'
                          : state.scene === 'chapter7'
                          ? 'Chapter 7 / The Road You Choose'
                          : state.scene === 'chapter6'
                          ? 'Chapter 6 / The Cage You Choose'
                          : state.scene === 'chapter5'
                          ? 'Chapter 5 / The Beautiful Life'
                          : state.scene === 'chapter4'
                            ? 'Chapter 4 / Private Access'
                            : state.scene === 'chapter3'
                              ? ['home', 'surveillance', 'complete'].includes(state.phase)
                                ? 'CHAPTER 3 · SCENE 1'
                                : state.contentRevision === 14 || isCurrentAuthoringRevision(state.contentRevision)
                                  ? 'CHAPTER 3 · SCENE ' + chapter3Number(state)
                                  : 'CHAPTER 3 · SCENE 2'
                              : 'ADRIAN’S DAY'}
                    <span>Every judgment leaves a record.</span>
                  </footer>
                </div>
              </div>
            </main>
          </div>
        </>
      )}
      {modal === 'navigation' && (
        <Modal title="Story menu" onClose={() => setModal(null)}>
          <div className="navigation-drawer">{navigation}</div>
        </Modal>
      )}
      {modal === 'assessment' && (
        <Modal title="Assessment" onClose={() => setModal(null)}>
          {assessment.status === 'idle' && (
            <p>No assessment is available at this point in the story.</p>
          )}
          {assessment.status === 'available' && (
            <>
              <p>
                You may assess now or continue the available investigation. Opening this record does
                not commit a conclusion.
              </p>
              <button onClick={() => send({ type: 'MISSION_CHOOSE', id: 'assess.begin' })}>
                Begin assessment
              </button>
            </>
          )}
          {assessment.status === 'required' && assessment.flow === 'helix' && (
            <Casework state={state} send={send} assessmentOnly />
          )}
          {assessment.status === 'required' && assessment.flow === 'mission' && (
            <>
              <Narrative blocks={sceneBlocks(state)} node={node} contentRevision={state.contentRevision} />
              <Missionwork state={state} send={send} />
            </>
          )}
          {assessment.status === 'completed' && (
            <>
              {state.mission.source && <MissionSummary state={state} />}
              {state.report && <Casework state={state} send={send} assessmentOnly />}
            </>
          )}
          <button onClick={() => setModal('journal')}>Review available evidence</button>
        </Modal>
      )}
      {modal === 'journal' && (
        <Modal title="Evidence journal" onClose={() => setModal(null)}>
          <Journal state={state} />
        </Modal>
      )}
      {modal === 'leverage' && (
        <Modal title="Leverage board" onClose={() => setModal(null)}>
          <LeverageBoard state={state} />
        </Modal>
      )}
      {modal === 'history' && (
        <Modal title="Conversation history" onClose={() => setModal(null)}>
          <div className="history">
            {conversationHistory(state).map((h, i) => (
              <section key={i}>
                <h3>{displayName(sceneById[h.node].place)}</h3>
                <Narrative blocks={h.blocks} node={h.node} contentRevision={state.contentRevision} />
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
    </FadeCoercionContext.Provider>
  );
}
