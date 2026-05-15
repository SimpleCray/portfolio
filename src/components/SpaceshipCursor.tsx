import { useRef, useEffect } from 'react';

// Ship image: nose points UP, exhaust nozzle ~22% below center
const SHIP_SIZE = 36;
const EXHAUST_OFFSET = SHIP_SIZE * 0.22;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // 1 → 0
  size: number;
}

/** Lerp angle with ±π wrap-around handling */
function lerpAngle(cur: number, target: number, t: number): number {
  let diff = target - cur;
  while (diff > Math.PI) diff -= Math.PI * 2;
  while (diff < -Math.PI) diff += Math.PI * 2;
  return cur + diff * t;
}

export default function SpaceshipCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let mx = -300,
      my = -300;
    let angle = -Math.PI / 2;
    let targetAngle = -Math.PI / 2;
    let speed = 0; // raw px/frame from mouse events
    let thrust = 0; // smoothed 0–1, drives ALL flame properties
    let hidden = true;

    const particles: Particle[] = [];

    let shipImg: HTMLImageElement | null = null;
    const img = new Image();
    img.onload = () => {
      shipImg = img;
    };
    img.src = '/images/spaceship.png';

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - mx;
      const dy = e.clientY - my;
      mx = e.clientX;
      my = e.clientY;
      hidden = false;

      speed = Math.sqrt(dx * dx + dy * dy);
      if (speed > 0.8) {
        // atan2 + π/2 converts movement vector to ship-space angle (nose = up)
        targetAngle = Math.atan2(dy, dx) + Math.PI / 2;
      }
    };

    const onLeave = () => {
      hidden = true;
    };
    const onEnter = () => {
      hidden = false;
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    let raf = 0;

    function frame() {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);

      if (!hidden) {
        angle = lerpAngle(angle, targetAngle, 0.12);

        // targetThrust = 0 when mouse stops, 1 at max speed (capped 20px/frame)
        const targetThrust = Math.min(speed / 20, 1);
        // Rise fast (0.25/frame), decay very slowly (0.015/frame) → ~1s fade-out
        thrust += (targetThrust > thrust ? 0.25 : 0.015) * (targetThrust - thrust);
        speed = 0; // reset; only non-zero when a mouse event fires

        // Nozzle world position (opposite of nose direction)
        const nozzleX = mx - Math.sin(angle) * EXHAUST_OFFSET;
        const nozzleY = my + Math.cos(angle) * EXHAUST_OFFSET;
        const flameDirX = -Math.sin(angle);
        const flameDirY = Math.cos(angle);

        // Emit down to very low thrust so fade-out stays visible the full second
        if (thrust > 0.005) {
          const t = performance.now();
          const flicker = 0.55 + 0.45 * Math.abs(Math.sin(t * 0.022 + Math.random() * 0.8));

          // ×2 particle count vs previous version
          const count = Math.ceil(thrust * 12 * flicker);
          for (let i = 0; i < count; i++) {
            const spread = (Math.random() - 0.5) * 0.5;
            const perpX = Math.cos(angle);
            const perpY = Math.sin(angle);
            // ×2 speed → longer visible trail
            const spd = (6 + Math.random() * 8) * thrust * flicker;
            particles.push({
              x: nozzleX + perpX * spread * 6,
              y: nozzleY + perpY * spread * 6,
              vx: flameDirX * spd + perpX * spread * 1.5,
              vy: flameDirY * spd + perpY * spread * 1.5,
              // ×2 initial life + size → brighter, longer-lasting particles
              life: (0.8 + Math.random() * 0.2) * thrust * flicker,
              size: (4 + Math.random() * 6) * thrust * flicker,
            });
          }
        }

        // Update + draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.91;
          p.vy *= 0.91;
          p.life -= 0.035; // slower decay → particle lives ~0.5s (was 0.28s)
          p.size *= 0.94;

          if (p.life <= 0 || p.size < 0.2) {
            particles.splice(i, 1);
            continue;
          }

          const a = p.life;
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          // Boosted alpha values for ×2 brightness
          grad.addColorStop(0, `rgba(255, 245, 255, ${Math.min(a * 1.4, 1)})`);
          grad.addColorStop(0.3, `rgba(210, 140, 255, ${Math.min(a * 1.3, 1)})`);
          grad.addColorStop(0.7, `rgba(140,  70, 255, ${a * 0.7})`);
          grad.addColorStop(1, `rgba(80,   0, 200, 0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        // Draw ship
        if (shipImg) {
          ctx.save();
          ctx.translate(mx, my);
          ctx.rotate(angle);
          ctx.drawImage(shipImg, -SHIP_SIZE / 2, -SHIP_SIZE / 2, SHIP_SIZE, SHIP_SIZE);
          ctx.restore();
        }
      }

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }}
    />
  );
}
