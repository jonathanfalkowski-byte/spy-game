import { useEffect, useRef } from 'react';
import { documents, searches, relationLabels, assessments } from '../content/evidence';
import { assess, nodeOf } from '../state/reducer';
import type { GameState } from '../state/schema';
import type { Intent } from '../state/actions';
import type { Relation } from '../content/schema';
export function Casework({ state, send }: { state: GameState; send: (a: Intent) => void }) {
  const node = nodeOf(state);
  const resultRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (state.investigation && node === 'helix.analysis') {
      resultRef.current?.focus();
      resultRef.current?.scrollIntoView({ block: 'center' });
    }
  }, [state.investigation]);
  if (node === 'helix.submitted' && state.report)
    return (
      <section className="report">
        <span className="tag">Report delivered · {state.report.quality}</span>
        <h2>Your submitted assessment</h2>
        <p>{state.report.text}</p>
        <p>{state.report.feedback}</p>
        {state.report.quality === 'unresolved' && (
          <blockquote>
            <span className="eyebrow">Benton · terminal message</span>
            <p>
              “This restates the file, Vale. It does not explain it. We will discuss your analytical
              standard later.”
            </p>
          </blockquote>
        )}
        <p className="muted">Casework is closed. Your journal remains available.</p>
      </section>
    );
  if (node === 'helix.review' && state.draft) {
    const result = assess(state, state.draft);
    return (
      <section className="report">
        <span className="tag">Draft · not yet submitted</span>
        <h2>Your exact conclusion</h2>
        <p className="report-text">{assessments.find((a) => a.id === state.draft)!.text}</p>
        <div className="notice">
          <strong>
            {result.quality === 'supported'
              ? 'Bounded assessment'
              : result.quality === 'weak'
                ? 'Conclusion exceeds the evidence'
                : result.quality === 'incorrect'
                  ? 'Unsupported accusation'
                  : 'Unresolved work'}
          </strong>
          <p>{result.feedback}</p>
        </div>
        <p>
          Attachments:{' '}
          {state.documents.map((id) => documents.find((d) => d.id === id)!.title).join(', ')}.
        </p>
        <p>
          {state.inferences.length} tested connections.{' '}
          {state.investigation
            ? `Follow-up: ${searches.find((s) => s.id === state.investigation)!.title}.`
            : 'No follow-up attached.'}
        </p>
        <p>
          Cost: closes the case and ends {state.opportunities} remaining investigation{' '}
          {state.opportunities === 1 ? 'opportunity' : 'opportunities'}. Recipient: Benton only.
        </p>
        <div className="actions">
          <button className="primary" onClick={() => send({ type: 'SUBMIT_ASSESSMENT' })}>
            Submit this assessment
          </button>
          <button onClick={() => send({ type: 'REVISE_ASSESSMENT' })}>Revise before sending</button>
        </div>
      </section>
    );
  }
  if (node !== 'helix.documents' && node !== 'helix.analysis') return null;
  return (
    <>
      <section aria-label="Case documents">
        <h2>
          {node === 'helix.analysis'
            ? 'Review the source documents'
            : 'Four records. One assignment.'}
        </h2>
        <div className="documents">
          {documents.map((d, i) => (
            <article
              className={state.documents.includes(d.id) ? 'document read' : 'document'}
              key={d.id}
            >
              <div className="document-top">
                <span className="eyebrow">
                  0{i + 1} / {d.type}
                </span>
                <span className="tag">{state.documents.includes(d.id) ? 'Read' : 'Unread'}</span>
              </div>
              <h3>{d.title}</h3>
              <p className="muted">{d.source}</p>
              {state.documents.includes(d.id) ? (
                <details open={node === 'helix.documents' ? true : undefined}>
                  <summary>Review {d.title}</summary>
                  <p>{d.body}</p>
                  <p className="source">{d.reliability}</p>
                  <p className="muted">{d.limits}</p>
                </details>
              ) : (
                <button onClick={() => send({ type: 'READ_DOCUMENT', id: d.id })}>
                  Read {d.title}
                </button>
              )}
            </article>
          ))}
        </div>
      </section>
      {node === 'helix.documents' && (
        <p className="muted">
          {state.documents.length} of 4 records read. Read at least two to continue.
        </p>
      )}
      {node === 'helix.analysis' && (
        <>
          <section className="workspace" aria-label="Connect evidence">
            <span className="eyebrow">01 / Connect</span>
            <h2>Choose two records</h2>
            <p>Selected: {state.selected.length} / 2. Deselect a record before choosing a third.</p>
            <div className="choice-list">
              {documents
                .filter((d) => state.documents.includes(d.id))
                .map((d) => (
                  <button
                    aria-pressed={state.selected.includes(d.id)}
                    key={d.id}
                    disabled={!state.selected.includes(d.id) && state.selected.length === 2}
                    onClick={() => send({ type: 'TOGGLE_EVIDENCE', id: d.id })}
                  >
                    <span>{d.summary}</span>
                    <small>
                      {d.layer === 'claim' ? 'Attributed claim' : 'Recorded fact'} · {d.source}
                      {state.selected.includes(d.id) ? ' · Selected' : ''}
                    </small>
                  </button>
                ))}
            </div>
            {state.selected.length === 2 && (
              <fieldset>
                <legend>How are these records related?</legend>
                <div className="choice-list">
                  {(Object.keys(relationLabels) as Relation[]).map((relation) => {
                    const previous = state.inferences.find(
                      (i) =>
                        i.pair === [...state.selected].sort().join('|') && i.relation === relation,
                    );
                    return (
                      <div key={relation}>
                        <button
                          disabled={!!previous}
                          onClick={() => send({ type: 'CONNECT_EVIDENCE', relation })}
                        >
                          {relationLabels[relation]}
                          {previous ? ' · Recorded' : ''}
                        </button>
                        {previous && <p className="notice">{previous.text}</p>}
                      </div>
                    );
                  })}
                </div>
              </fieldset>
            )}
            <p className="muted">
              Testing a connection spends no opportunity and carries no penalty.
            </p>
            <button onClick={() => send({ type: 'REQUEST_HINT' })} disabled={state.hintUsed}>
              {state.hintUsed
                ? 'Guided comparison requested'
                : 'Request a guided comparison · free'}
            </button>
            {state.hintUsed && (
              <p className="notice">
                Compare the stated reason for buying Novagen with what the authenticated filing says
                Helix did with that same asset type. Decide whether those actions support or
                undermine the stated reason.
              </p>
            )}
          </section>
          <section className="workspace" aria-label="Further investigation">
            <span className="eyebrow">02 / Investigate · Optional</span>
            <h2>
              {state.opportunities} investigation{' '}
              {state.opportunities === 1 ? 'opportunity remains' : 'opportunities remain'}
            </h2>
            <p>
              Before the noon deadline there is time for one follow-up. Choose where Adrian spends
              it; the other searches become unavailable.
            </p>
            {state.investigation ? (
              <article className="search-result" ref={resultRef} tabIndex={-1}>
                <span className="tag">Investigation completed · 0 remain</span>
                <h3>{searches.find((s) => s.id === state.investigation)!.title}</h3>
                <p>{searches.find((s) => s.id === state.investigation)!.action}</p>
                <p>{searches.find((s) => s.id === state.investigation)!.result}</p>
                <p className="muted">
                  {searches.find((s) => s.id === state.investigation)!.limits}
                </p>
                <p>
                  This follow-up consumed the one investigation opportunity available before the
                  deadline.
                </p>
              </article>
            ) : (
              <div className="choice-list">
                {searches.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => send({ type: 'SPEND_INVESTIGATION', id: s.id })}
                  >
                    <span>{s.title}</span>
                    <small>{s.action} Cost: 1 opportunity. Leaves 0.</small>
                  </button>
                ))}
              </div>
            )}
          </section>
          <section className="workspace" aria-label="Assessment">
            <span className="eyebrow">03 / Assess</span>
            <h2>What will you put on the record?</h2>
            <p>
              You can submit without resolving the case. The next screen explains what your report
              supports and the consequences of sending it.
            </p>
            <div className="choice-list">
              {assessments
                .filter((a) => a.id !== 'bounded' || state.knowledge.includes('patent_conflict'))
                .map((a) => (
                  <button key={a.id} onClick={() => send({ type: 'REVIEW_ASSESSMENT', id: a.id })}>
                    {a.label}
                    <small>Review this assessment before committing.</small>
                  </button>
                ))}
            </div>
          </section>
        </>
      )}
    </>
  );
}
