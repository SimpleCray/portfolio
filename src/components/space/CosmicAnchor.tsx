import { useRef, useState, useEffect } from 'react';

interface Props {
  target: string;
  frac?: number;
  side?: 'left' | 'right' | 'center';
  offset?: number;
  width: number;
  height: number;
  scrollSpeed?: number;
  className?: string;
  children?: React.ReactNode;
}

export default function CosmicAnchor({
  target,
  frac = 0.5,
  side = 'right',
  offset = 0,
  width,
  height,
  scrollSpeed = 1,
  className = '',
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, ready: false });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const compute = () => {
      const tgt = document.querySelector(target);
      const page = document.querySelector('.page');
      if (!tgt || !page) return;
      const pageRect = page.getBoundingClientRect();
      const tgtRect = tgt.getBoundingClientRect();
      const top = tgtRect.top - pageRect.top + tgtRect.height * frac - height / 2;
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
  }, [target, frac, height]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !pos.ready) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setVisible(e.isIntersecting)),
      { rootMargin: '20% 0px 20% 0px', threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [pos.ready]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !pos.ready) return;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.setProperty('--parallax', -center * 0.05 * scrollSpeed + 'px');
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
    position: 'absolute',
    top: pos.top,
    width,
    height,
    opacity: pos.ready && visible ? 1 : 0,
    transform: 'translateY(var(--parallax, 0px))',
    transition: 'opacity 1.4s ease',
  };
  if (side === 'left') style.left = offset;
  else if (side === 'center') {
    style.left = '50%';
    style.marginLeft = -width / 2 + offset;
  } else style.right = offset;

  return (
    <div ref={ref} className={className} style={style} aria-hidden='true'>
      {children}
    </div>
  );
}
