import { useLayoutEffect, useRef, useState } from 'react';
import type { SceneArt } from './scene-art';
import { useMediaQuery } from './useMediaQuery';

/** Resolved production art only; a previous image must still pass the current state guard. */
export function SceneArtStage({
  art,
  canHold,
  onUnavailable,
}: {
  art: SceneArt;
  canHold: (previous: SceneArt) => boolean;
  onUnavailable: (source: string) => void;
}) {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const previous = useRef(art);
  const [outgoing, setOutgoing] = useState<SceneArt>();
  useLayoutEffect(() => {
    const old = previous.current;
    previous.current = art;
    if (old.shotId === art.shotId && old.asset.src === art.asset.src) {
      setOutgoing(undefined);
      return;
    }
    setOutgoing(!reducedMotion && canHold(old) ? old : undefined);
    const timer = window.setTimeout(() => setOutgoing(undefined), 200);
    return () => window.clearTimeout(timer);
  }, [art, canHold, reducedMotion]);
  const fading = !reducedMotion && outgoing && canHold(outgoing) && outgoing.shotId !== art.shotId;
  return (
    <figure className="scene-art-stage" data-reading-shot={art.shotId} data-asset-id={art.asset.id}>
      <div
        className="scene-art-atmosphere"
        aria-hidden="true"
        style={{ backgroundImage: `url("${import.meta.env.BASE_URL}${art.asset.src}")` }}
      />
      <img
        key={art.shotId}
        className={`scene-art-image${art.kind ? ` ${art.kind}-scene-art` : ''}`}
        src={`${import.meta.env.BASE_URL}${art.asset.src}`}
        alt={art.alt}
        width={art.asset.width}
        height={art.asset.height}
        decoding="async"
        onError={() => onUnavailable(art.asset.src)}
      />
      {fading && (
        <img
          className="scene-art-outgoing"
          src={`${import.meta.env.BASE_URL}${outgoing.asset.src}`}
          alt=""
          aria-hidden="true"
          width={outgoing.asset.width}
          height={outgoing.asset.height}
        />
      )}
    </figure>
  );
}
