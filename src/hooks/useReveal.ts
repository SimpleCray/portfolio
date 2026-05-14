import { useRef, useState, useEffect } from 'react';

/**
 * Trigger a one-shot "visible" flag when the attached element scrolls into view.
 *
 * Usage:
 *   const [ref, visible] = useReveal();
 *   <div ref={ref} className={`reveal${visible ? ' visible' : ''}`}>...</div>
 *
 * The observer disconnects after the first intersection so it only fires once —
 * elements don't re-hide when you scroll back up.
 */
export function useReveal(): [React.RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect(); // fire once, then stop watching
          }
        });
      },
      // Element must be 15% inside the viewport before triggering
      { threshold: 0.15 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, visible];
}
