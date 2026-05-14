import { useState, useEffect } from 'react';

/**
 * Animate a number from 0 to `target` over `duration` ms using cubic ease-out.
 * Only starts when `start` becomes true (typically from useReveal).
 *
 * Usage:
 *   const count = useCounter(yoe, visible, 1200);
 *   <span>{count}+</span>
 */
export function useCounter(target: number, start: boolean, duration = 1400): number {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!start) return;

    let raf: number;
    let t0: number | null = null;

    const step = (t: number) => {
      if (!t0) t0 = t;
      const p = Math.min((t - t0) / duration, 1); // 0 → 1 linear progress

      // Cubic ease-out: starts fast, decelerates — feels more natural than linear
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));

      if (p < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);

  return val;
}
