'use client';

import { useRef, useState, useEffect } from 'react';

export type PlanetKind =
  | 'earth'
  | 'moon'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune'
  | 'sun';

interface Props {
  kind: PlanetKind; // determines CSS gradient recipe (e.g. .planet-earth)
  size: number; // px diameter
  target: string; // CSS selector of the section to anchor to
  frac?: number; // 0–1, vertical fraction of the target section's height
  side?: 'left' | 'right';
  offset?: number; // px offset from the edge (negative = outside viewport)
  opacity?: number;
  scrollSpeed?: number; // parallax multiplier — higher = moves faster
}

export default function Planet({
  kind,
  size,
  target,
  frac = 0.5,
  side = 'right',
  offset = -120,
  opacity = 0.85,
  scrollSpeed = 1,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, ready: false });
  const [visible, setVisible] = useState(false);

  /**
   * Section-anchored positioning.
   * Planets are positioned inside `.page` (position:relative), so we calculate
   * their `top` by measuring the target section's bounding rect relative to
   * the .page wrapper, then offsetting by `frac` of the section's height.
   *
   * We retry at 300ms and 1200ms because section heights are unknown until
   * images and fonts load, so the first measurement may be slightly off.
   */
  useEffect(() => {
    const compute = () => {
      const tgt = document.querySelector(target);
      const page = document.querySelector('.page');
      if (!tgt || !page) return;
      const pageRect = page.getBoundingClientRect();
      const tgtRect = tgt.getBoundingClientRect();
      // Planet center = section top + fraction of section height - half planet size
      const top = tgtRect.top - pageRect.top + tgtRect.height * frac - size / 2;
      setPos({ top, ready: true });
    };

    compute();
    window.addEventListener('resize', compute);
    const t1 = setTimeout(compute, 300);
    const t2 = setTimeout(compute, 1200);
    return () => {
      window.removeEventListener('resize', compute);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [target, frac, size]);

  // Fade in/out as the planet enters/leaves the viewport
  useEffect(() => {
    const el = ref.current;
    if (!el || !pos.ready) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setVisible(e.isIntersecting)),
      { rootMargin: '15% 0px 15% 0px', threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [pos.ready]);

  /**
   * Parallax scroll effect.
   * Each planet drifts at its own speed relative to the viewport center.
   * The CSS variable `--parallax` is read by `transform: translateY(var(--parallax))`.
   * Using a CSS variable avoids React re-renders on every scroll event.
   */
  useEffect(() => {
    const el = ref.current;
    if (!el || !pos.ready) return;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      // Distance from planet center to viewport center, scaled by scrollSpeed
      const center = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.setProperty('--parallax', -center * 0.08 * scrollSpeed + 'px');
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [scrollSpeed, pos.ready]);

  const style: React.CSSProperties = {
    top: pos.top,
    width: size,
    height: size,
    opacity: pos.ready && visible ? opacity : 0,
    transform: 'translateY(var(--parallax, 0px))',
    ...(side === 'left' ? { left: offset } : { right: offset }),
  };

  return (
    <div
      ref={ref}
      className={`planet planet-${kind}${visible ? ' visible' : ''}`}
      style={style}
      aria-hidden='true'
    >
      <div className='planet-wrap' style={{ width: '100%', height: '100%' }}>
        <div className='planet-inner'>
          {/* Saturn and Uranus have ring divs styled purely in CSS */}
          {(kind === 'saturn' || kind === 'uranus') && <div className='rings' />}
        </div>
      </div>
    </div>
  );
}
