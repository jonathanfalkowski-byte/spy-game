import { useContext } from 'react';
import type { Block } from '../content/schema';
import { fadeCoercion13 } from '../content/chapter13';
import { FadeCoercionContext } from './reader-context';
import { displayName, readingBlocks, thoughtLabel } from './reading-presentation';
export function Narrative({ blocks, node, contentRevision }: { blocks: Block[]; node?: string; contentRevision?: number }) {
  const fade = useContext(FadeCoercionContext);
  const shown = fade ? fadeCoercion13(blocks) : blocks;
  return (
    <div className="narrative">
      {readingBlocks(shown, node, contentRevision).map((b, i) =>
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
