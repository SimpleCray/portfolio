'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`scroll-top${visible ? ' visible' : ''}`}
      onClick={handleClick}
      aria-label='Scroll to top'
      data-hover=''
    >
      <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
        <path d='M12 19V5M5 12l7-7 7 7' />
      </svg>
    </button>
  );
}
