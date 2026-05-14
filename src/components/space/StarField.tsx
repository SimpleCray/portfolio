import { useRef, useEffect } from 'react';

interface Star {
  x: number;
  y: number;
  r: number;
  phase: number;
  speed: number;
  tint: boolean;
  big: boolean;
  depth: number;
}

interface Nebula {
  x: number;
  y: number;
  r: number;
  color: string;
  a: number;
}

export default function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let stars: Star[] = [];
    let nebulae: Nebula[] = [];
    let raf = 0;
    let mx = 0,
      my = 0;
    let scrollY = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = w + 'px';
      canvas!.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.floor((w * h) / 3200);
      stars = [];
      for (let i = 0; i < target; i++) {
        const big = Math.random() < 0.04;
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: big ? 1.4 + Math.random() * 1.2 : 0.4 + Math.random() * 0.9,
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 1.4,
          tint: Math.random() < 0.18,
          big,
          depth: Math.random() * 0.85 + 0.15,
        });
      }
      nebulae = [
        { x: w * 0.15, y: h * 0.4, r: Math.max(w, h) * 0.55, color: '168,85,247', a: 0.1 },
        { x: w * 0.85, y: h * 0.7, r: Math.max(w, h) * 0.5, color: '80,140,255', a: 0.08 },
        { x: w * 0.5, y: h * 0.2, r: Math.max(w, h) * 0.45, color: '236,72,153', a: 0.06 },
      ];
    }

    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);

    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    scrollY = window.scrollY;

    function frame(t: number) {
      const w = canvas!.width / (window.devicePixelRatio || 1);
      const h = canvas!.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);

      for (const n of nebulae) {
        const offset = scrollY * 0.05;
        const ny = ((((n.y - offset) % (h * 2)) + h * 2) % (h * 2)) - h * 0.5;
        const grad = ctx.createRadialGradient(n.x, ny, 0, n.x, ny, n.r);
        grad.addColorStop(0, `rgba(${n.color}, ${n.a})`);
        grad.addColorStop(1, `rgba(${n.color}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, ny, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      const time = t * 0.001;
      for (const s of stars) {
        const offset = scrollY * s.depth * 0.18;
        const py_raw = (((s.y - offset) % h) + h) % h;
        const tw = 0.55 + 0.45 * Math.sin(time * s.speed + s.phase);
        const px = s.x + mx * s.depth * 8;
        const py = py_raw + my * s.depth * 4;
        const a = tw * (s.big ? 1 : 0.85);

        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.tint ? `rgba(192, 132, 252, ${a * 0.9})` : `rgba(232, 237, 242, ${a})`;
        ctx.fill();

        if (s.big && tw > 0.8) {
          ctx.strokeStyle = `rgba(232, 237, 242, ${a * 0.35})`;
          ctx.lineWidth = 0.4;
          const spike = s.r * 6 * tw;
          ctx.beginPath();
          ctx.moveTo(px - spike, py);
          ctx.lineTo(px + spike, py);
          ctx.moveTo(px, py - spike);
          ctx.lineTo(px, py + spike);
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return <canvas ref={ref} className='star-canvas' aria-hidden='true' />;
}
