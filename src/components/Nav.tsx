import { useState, useEffect, useRef } from 'react';

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'ai', label: 'AI' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false); // controls frosted-glass background
  const [active, setActive] = useState('home'); // which nav link is highlighted
  // Cached section positions — recalculated on resize, not on every scroll tick
  const sectionsRef = useRef<{ id: string; top: number }[]>([]);

  // Toggle .scrolled class to show backdrop blur after 24px of scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    /**
     * Position-based scroll spy — more reliable than IntersectionObserver for
     * sections near the bottom of the page (IO's rootMargin can't detect those).
     *
     * Strategy: walk the offsetParent chain to get each section's true absolute
     * top. On scroll, find the last section whose top is above (scrollY + 120px).
     * The 120px threshold fires the highlight slightly before the section reaches
     * the very top of the viewport.
     */
    const cacheSections = () => {
      sectionsRef.current = links
        .map(({ id }) => {
          const el = document.getElementById(id);
          if (!el) return null;
          // el.offsetTop alone is relative to offsetParent (.page div),
          // so we walk up the chain to get the absolute document position
          let top = 0;
          let node: HTMLElement | null = el;
          while (node) {
            top += node.offsetTop;
            node = node.offsetParent as HTMLElement | null;
          }
          return { id, top };
        })
        .filter(Boolean) as { id: string; top: number }[];
    };

    const spy = () => {
      const y = window.scrollY;
      const wh = window.innerHeight;
      const dh = document.documentElement.scrollHeight;

      // Contact is the last section — force-activate when near page bottom
      // because there may not be enough scroll range to hit the threshold normally
      if (y + wh >= dh - 150) {
        setActive('contact');
        return;
      }

      const threshold = y + 120;
      let cur = links[0].id;
      for (const s of sectionsRef.current) {
        if (s.top <= threshold) cur = s.id;
      }
      setActive(cur);
    };

    // requestAnimationFrame ensures the DOM has fully laid out before we
    // read offsetTop values (avoids stale positions on first render)
    const raf = requestAnimationFrame(() => {
      cacheSections();
      spy();
    });

    window.addEventListener('scroll', spy, { passive: true });
    window.addEventListener('resize', cacheSections, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', spy);
      window.removeEventListener('resize', cacheSections);
    };
  }, []);

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className='container inner'>
        <a href='#home' className='brand'>
          SimpleCray
        </a>
        <div className='links'>
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={active === l.id ? 'active' : ''}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
