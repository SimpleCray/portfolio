import { useState, useEffect, useRef } from 'react';

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const sectionsRef = useRef<{ id: string; top: number }[]>([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Cache absolute positions once (offsetTop walks up to document root)
    const cacheSections = () => {
      sectionsRef.current = links
        .map(({ id }) => {
          const el = document.getElementById(id);
          if (!el) return null;
          // Walk offsetParent chain to get true absolute top
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

      // Force-activate contact when near bottom
      if (y + wh >= dh - 150) {
        setActive('contact');
        return;
      }

      // Section whose top is closest above scrollY + 120px threshold
      const threshold = y + 120;
      let cur = links[0].id;
      for (const s of sectionsRef.current) {
        if (s.top <= threshold) cur = s.id;
      }
      setActive(cur);
    };

    // Cache after layout settles, then start listening
    const init = () => {
      cacheSections();
      spy();
    };

    const raf = requestAnimationFrame(init);
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
          Hai Duong<span className='dot'>.</span>
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
