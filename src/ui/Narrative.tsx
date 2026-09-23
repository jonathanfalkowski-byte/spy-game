import type { Block } from '../content/schema';
import { displayName, readingBlocks, thoughtLabel } from './reading-presentation';
export function Narrative({ blocks, node, contentRevision }: { blocks: Block[]; node?: string; contentRevision?: number }) {
  return (
    <div className="narrative">
      {readingBlocks(blocks, node, contentRevision).map((b, i) =>
        b.kind === 'speech' ? (
          <blockquote key={i}>
            <span className="eyebrow">{displayName(b.speaker ?? '')}</span>
            <p>{displayName(b.text)}</p>
          </blockquote>
        ) : b.kind === 'thought' ? (
          <aside className="thought" key={i}>
            <span className="eyebrow">{thoughtLabel(node)}</span>
            <p>{displayName(b.text)}</p>
          </aside>
        ) : (
          <p key={i} className={b.kind === 'notice' ? 'notice' : ''}>
            {displayName(b.text)}
          </p>
        ),
      )}
    </div>
  );
}
