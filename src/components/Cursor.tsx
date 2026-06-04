'use client';

import { useRef, useState, useEffect } from 'react';

/**
 * Two-layer custom cursor:
 *   - `.cursor`      — small dot, snaps exactly to mouse position
 *   - `.cursor-ring` — larger ring, follows with lerp smoothing (0.18/frame)
 *
 * The ring grows and turns accent when hovering interactive elements.
 * Both elements are hidden until the mouse first moves into the document.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    // rx/ry = ring's current position (lerped toward dx/dy each frame)
    let rx = 0,
      ry = 0,
      dx = 0,
      dy = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      dx = e.clientX;
      dy = e.clientY;
      // Dot moves instantly — no lag
      if (dot.current) {
        dot.current.style.left = dx + 'px';
        dot.current.style.top = dy + 'px';
      }
      if (hidden) setHidden(false);
    };

    // Ring smoothing loop: lerp 18% of the remaining distance each frame
    // Lower value = more lag/smoothness; higher = snappier
    const tick = () => {
      rx += (dx - rx) * 0.18;
      ry += (dy - ry) * 0.18;
      if (ring.current) {
        ring.current.style.left = rx + 'px';
        ring.current.style.top = ry + 'px';
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Detect when cursor is over an interactive element
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (!t?.closest) return;
      setHover(!!t.closest('a, button, [data-hover], input, textarea, .project-media'));
    };

    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(raf);
    };
  }, [hidden]);

  return (
    <>
      <div ref={dot} className={`cursor${hidden ? ' hidden' : ''}`} />
      <div ref={ring} className={`cursor-ring${hidden ? ' hidden' : ''}${hover ? ' hover' : ''}`} />
    </>
  );
}
