import type { Block } from '../content/schema';
import { displayName, readingBlocks } from './reading-presentation';
export function Narrative({ blocks, node }: { blocks: Block[]; node?: string }) {
  return (
    <div className="narrative">
      {readingBlocks(blocks, node).map((b, i) =>
        b.kind === 'speech' ? (
          <blockquote key={i}>
            <span className="eyebrow">{displayName(b.speaker ?? '')}</span>
            <p>{displayName(b.text)}</p>
          </blockquote>
        ) : b.kind === 'thought' ? (
          <aside className="thought" key={i}>
            <span className="eyebrow">Adrian · private thought</span>
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
