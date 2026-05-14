import { useState, useEffect } from 'react';

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY;
      const windowH = window.innerHeight;
      const docH = document.body.scrollHeight;

      // Near bottom of page → always activate last section
      if (scrollY + windowH >= docH - 80) {
        setActive('contact');
        return;
      }

      // Find which section's top is closest above the trigger line (30% from top)
      const triggerY = scrollY + windowH * 0.3;
      let current = links[0].id;

      for (const { id } of links) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= triggerY) {
          current = id;
        }
      }

      setActive(current);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
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
