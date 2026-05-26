'use client';

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

    // Accumulate movement and only recompute heading once it crosses this
    // distance, so tiny jittery moves don't flip the angle every event.
    const ANGLE_UPDATE_DIST = 6;
    let accDx = 0;
    let accDy = 0;

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

      // Accumulate raw deltas; the summed vector is a far more stable heading
      // than any single tiny event. Only rotate once it's a real move.
      accDx += dx;
      accDy += dy;
      if (accDx * accDx + accDy * accDy > ANGLE_UPDATE_DIST * ANGLE_UPDATE_DIST) {
        // atan2 + π/2 converts movement vector to ship-space angle (nose = up)
        targetAngle = Math.atan2(accDy, accDx) + Math.PI / 2;
        accDx = 0;
        accDy = 0;
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
        angle = lerpAngle(angle, targetAngle, 0.1);

        // Cap at 8px/frame so normal movement gives ~0.6 thrust, not just 0.25
        const targetThrust = Math.min(speed / 8, 1);
        thrust += (targetThrust > thrust ? 0.3 : 0.015) * (targetThrust - thrust);
        speed = 0;

        const nozzleX = mx - Math.sin(angle) * EXHAUST_OFFSET;
        const nozzleY = my + Math.cos(angle) * EXHAUST_OFFSET;
        const flameDirX = -Math.sin(angle);
        const flameDirY = Math.cos(angle);

        if (thrust > 0.01) {
          const t = performance.now();
          // Flicker only affects visual brightness, not count/size/life
          const flicker = 0.7 + 0.3 * Math.abs(Math.sin(t * 0.025 + Math.random() * 0.6));

          // Count scales with thrust — main control of flame density
          const count = Math.ceil(thrust * 8);
          for (let i = 0; i < count; i++) {
            const spread = (Math.random() - 0.5) * 0.5;
            const perpX = Math.cos(angle);
            const perpY = Math.sin(angle);
            // Speed: fixed base + thrust bonus → trail length grows with speed
            const spd = (5 + Math.random() * 6) * (0.4 + thrust * 0.6);
            particles.push({
              x: nozzleX + perpX * spread * 5,
              y: nozzleY + perpY * spread * 5,
              vx: flameDirX * spd + perpX * spread * 1.5,
              vy: flameDirY * spd + perpY * spread * 1.5,
              // Life is mostly constant — particles always live ~0.5s regardless of thrust
              life: (0.8 + Math.random() * 0.2) * flicker,
              // Size has a minimum so particles are always visible
              size: 3 + Math.random() * 4 + thrust * (2 + Math.random() * 3),
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
