/* global React */
/* Space layer — StarField (canvas w/ scroll parallax), SolarSystem (planets in real order), CosmicObjects */

function StarField() {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let stars = [];
    let raf = 0;
    let mx = 0, my = 0;
    let scrollY = 0;
    let lastT = 0;
    // Subtle drifting nebula blobs (canvas-drawn, behind stars)
    let nebulae = [];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density scales with viewport
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
          depth: Math.random() * 0.85 + 0.15,   // 0.15 (far) → 1.0 (near)
        });
      }
      // Nebulae: 3 large soft blobs at random positions
      nebulae = [
        { x: w * 0.15, y: h * 0.4, r: Math.max(w, h) * 0.55, color: '168,85,247', a: 0.10 },
        { x: w * 0.85, y: h * 0.7, r: Math.max(w, h) * 0.50, color: '80,140,255',  a: 0.08 },
        { x: w * 0.5,  y: h * 0.2, r: Math.max(w, h) * 0.45, color: '236,72,153', a: 0.06 },
      ];
    }
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);

    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });
    scrollY = window.scrollY;

    function frame(t) {
      lastT = t;
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);

      // Draw nebulae (background depth, very subtle)
      for (const n of nebulae) {
        const offset = scrollY * 0.05;   // slowest parallax
        const ny = ((n.y - offset) % (h * 2) + h * 2) % (h * 2) - h * 0.5;
        const grad = ctx.createRadialGradient(n.x, ny, 0, n.x, ny, n.r);
        grad.addColorStop(0, `rgba(${n.color}, ${n.a})`);
        grad.addColorStop(1, `rgba(${n.color}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, ny, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Stars with scroll + mouse parallax
      const time = t * 0.001;
      for (const s of stars) {
        const offset = scrollY * s.depth * 0.18;
        let py = ((s.y - offset) % h + h) % h;
        const tw = 0.55 + 0.45 * Math.sin(time * s.speed + s.phase);
        const px = s.x + mx * s.depth * 8;
        py += my * s.depth * 4;
        const a = tw * (s.big ? 1 : 0.85);

        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        if (s.tint) {
          ctx.fillStyle = `rgba(192, 132, 252, ${a * 0.9})`;
        } else {
          ctx.fillStyle = `rgba(232, 237, 242, ${a})`;
        }
        ctx.fill();

        if (s.big && tw > 0.8) {
          ctx.strokeStyle = `rgba(232, 237, 242, ${a * 0.35})`;
          ctx.lineWidth = 0.4;
          const spike = s.r * 6 * tw;
          ctx.beginPath();
          ctx.moveTo(px - spike, py); ctx.lineTo(px + spike, py);
          ctx.moveTo(px, py - spike); ctx.lineTo(px, py + spike);
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

  return <canvas ref={ref} className="star-canvas" aria-hidden="true"></canvas>;
}

// Planet — positioned dynamically by target section, parallax-ed on scroll
function Planet({ kind, size, target, frac = 0.5, side = 'right', offset = -120, opacity = 0.85, scrollSpeed = 1 }) {
  const ref = React.useRef(null);
  const [pos, setPos] = React.useState({ top: 0, ready: false });
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const compute = () => {
      const tgt = document.querySelector(target);
      const page = document.querySelector('.page');
      if (!tgt || !page) return;
      const pageRect = page.getBoundingClientRect();
      const tgtRect = tgt.getBoundingClientRect();
      const top = (tgtRect.top - pageRect.top) + (tgtRect.height * frac) - (size / 2);
      setPos({ top, ready: true });
    };
    compute();
    const onResize = () => compute();
    window.addEventListener('resize', onResize);
    const t1 = setTimeout(compute, 300);
    const t2 = setTimeout(compute, 1200);
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(t1); clearTimeout(t2);
    };
  }, [target, frac, size]);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => setVisible(e.isIntersecting));
    }, { rootMargin: '15% 0px 15% 0px', threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, [pos.ready]);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2 - window.innerHeight / 2;
      const px = -center * 0.08 * scrollSpeed;
      el.style.setProperty('--parallax', px + 'px');
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [scrollSpeed, pos.ready]);

  const style = {
    top: pos.top,
    width: size, height: size,
    opacity: pos.ready && visible ? opacity : 0,
    transform: `translateY(calc(var(--parallax, 0px)))`,
  };
  if (side === 'left') style.left = offset;
  else style.right = offset;

  return (
    <div ref={ref} className={`planet planet-${kind} ${visible ? 'visible' : ''}`} style={style} aria-hidden="true">
      <div className="planet-wrap" style={{ width: '100%', height: '100%' }}>
        <div className="planet-inner">
          {(kind === 'saturn' || kind === 'uranus') && <div className="rings"></div>}
        </div>
      </div>
    </div>
  );
}

function SolarSystem() {
  // Order: Earth+Moon (hero) → Mars (about) → asteroid belt → Jupiter → Saturn → Uranus → Neptune → Sun
  const planets = [
    // Hero: Earth (big) + Moon (small companion)
    { kind: 'earth',   size: 380, target: '#home',  frac: 0.5, side: 'right', offset: -160, scrollSpeed: 1.0, opacity: 0.88 },
    { kind: 'moon',    size: 90,  target: '#home',  frac: 0.32, side: 'right', offset: 220, scrollSpeed: 1.6, opacity: 0.92 },

    // About: Mars (4th from sun, next outward after Earth)
    { kind: 'mars',    size: 320, target: '#about', frac: 0.5, side: 'left', offset: -240, scrollSpeed: 0.9, opacity: 0.7 },

    // Project 1: Jupiter (largest, "biggest mission")
    { kind: 'jupiter', size: 460, target: '#work .project[data-i="0"]', frac: 0.5, side: 'right', offset: -180, scrollSpeed: 0.85, opacity: 0.78 },

    // Project 2: Saturn (rings)
    { kind: 'saturn',  size: 380, target: '#work .project[data-i="1"]', frac: 0.5, side: 'left',  offset: -260, scrollSpeed: 0.75, opacity: 0.7 },

    // Project 3: Uranus (cyan-tinted)
    { kind: 'uranus',  size: 280, target: '#work .project[data-i="2"]', frac: 0.5, side: 'right', offset: -120, scrollSpeed: 1.0, opacity: 0.75 },

    // Project 4: Neptune (deep blue, farthest)
    { kind: 'neptune', size: 280, target: '#work .project[data-i="3"]', frac: 0.5, side: 'left',  offset: -120, scrollSpeed: 1.05, opacity: 0.78 },

    // Contact: Sun (the source, warm welcoming end)
    { kind: 'sun',     size: 500, target: '#contact', frac: 0.5, side: 'right', offset: -180, scrollSpeed: 0.55, opacity: 0.92 },
  ];
  return (
    <div className="solar-system" aria-hidden="true">
      {planets.map((p, i) => <Planet key={i} {...p} />)}
    </div>
  );
}

// ────────── CosmicObjects: galaxy, black hole, asteroid belt, comets ──────────

function CosmicAnchor({ target, frac = 0.5, side = 'right', offset = 0, width, height, scrollSpeed = 1, children, className = '' }) {
  const ref = React.useRef(null);
  const [pos, setPos] = React.useState({ top: 0, ready: false });
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const compute = () => {
      const tgt = document.querySelector(target);
      const page = document.querySelector('.page');
      if (!tgt || !page) return;
      const pageRect = page.getBoundingClientRect();
      const tgtRect = tgt.getBoundingClientRect();
      const top = (tgtRect.top - pageRect.top) + (tgtRect.height * frac) - (height / 2);
      setPos({ top, ready: true });
    };
    compute();
    const onResize = () => compute();
    window.addEventListener('resize', onResize);
    const t1 = setTimeout(compute, 300);
    const t2 = setTimeout(compute, 1200);
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(t1); clearTimeout(t2);
    };
  }, [target, frac, height]);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => setVisible(e.isIntersecting));
    }, { rootMargin: '20% 0px 20% 0px', threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, [pos.ready]);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2 - window.innerHeight / 2;
      const px = -center * 0.05 * scrollSpeed;
      el.style.setProperty('--parallax', px + 'px');
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [scrollSpeed, pos.ready]);

  const style = {
    position: 'absolute',
    top: pos.top,
    width, height,
    opacity: pos.ready && visible ? 1 : 0,
    transform: `translateY(calc(var(--parallax, 0px)))`,
    transition: 'opacity 1.4s ease',
  };
  if (side === 'left') style.left = offset;
  else if (side === 'center') { style.left = '50%'; style.marginLeft = -width / 2 + offset; }
  else style.right = offset;

  return (
    <div ref={ref} className={className} style={style} aria-hidden="true">
      {children}
    </div>
  );
}

function GalaxySVG({ size = 600 }) {
  return (
    <svg className="galaxy visible" viewBox="-100 -100 200 200" style={{ width: size, height: size, display: 'block' }}>
      <defs>
        <radialGradient id="g-core">
          <stop offset="0%" stopColor="#fff5d4" stopOpacity="1"/>
          <stop offset="40%" stopColor="#ffd070" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="rgba(255,150,40,0)"/>
        </radialGradient>
        <radialGradient id="g-arm-v">
          <stop offset="0%" stopColor="rgba(192,132,252,0.7)"/>
          <stop offset="60%" stopColor="rgba(120,80,200,0.25)"/>
          <stop offset="100%" stopColor="rgba(80,40,150,0)"/>
        </radialGradient>
        <radialGradient id="g-arm-b">
          <stop offset="0%" stopColor="rgba(120,180,255,0.6)"/>
          <stop offset="60%" stopColor="rgba(60,100,200,0.2)"/>
          <stop offset="100%" stopColor="rgba(40,60,150,0)"/>
        </radialGradient>
      </defs>
      <g className="spin">
        {/* Outer disc halo */}
        <ellipse cx="0" cy="0" rx="95" ry="32" fill="url(#g-arm-v)" opacity="0.4"/>
        {/* Spiral arms — 4 rotated thin ellipses */}
        {[0, 45, 90, 135].map(deg => (
          <ellipse
            key={deg}
            cx="0" cy="0"
            rx="86" ry="8"
            fill="url(#g-arm-v)"
            transform={`rotate(${deg})`}
            opacity="0.7"
          />
        ))}
        {[22, 67, 112, 157].map(deg => (
          <ellipse
            key={deg}
            cx="0" cy="0"
            rx="74" ry="5"
            fill="url(#g-arm-b)"
            transform={`rotate(${deg})`}
            opacity="0.5"
          />
        ))}
        {/* Disc */}
        <ellipse cx="0" cy="0" rx="78" ry="18" fill="url(#g-core)" opacity="0.4"/>
        {/* Core */}
        <circle cx="0" cy="0" r="20" fill="url(#g-core)"/>
        <circle cx="0" cy="0" r="6" fill="#fff8dc"/>
      </g>
    </svg>
  );
}

function BlackHole({ size = 360 }) {
  return (
    <div className="black-hole visible" style={{ width: size, height: size }}>
      <div className="disk"></div>
      <div className="disk-edge"></div>
      <div className="lens"></div>
      <div className="core"></div>
    </div>
  );
}

function AsteroidBelt({ width = 700, height = 140, count = 50 }) {
  const dots = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        r: 1.5 + Math.random() * 4,
        d: Math.random() * 4,
      });
    }
    return arr;
  }, [count]);
  return (
    <div className="asteroid-belt visible" style={{ width, height, position: 'relative' }}>
      {dots.map((d, i) => (
        <span
          key={i}
          className="asteroid"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.r * 2,
            height: d.r * 2,
            animationDelay: `${d.d}s`,
          }}
        />
      ))}
    </div>
  );
}

function CosmicObjects() {
  return (
    <div className="cosmic-layer" aria-hidden="true">
      {/* Galaxy — distant, top of hero, far-far-away */}
      <CosmicAnchor target="#home" frac={0.15} side="left" offset={-80} width={520} height={520} scrollSpeed={0.5}>
        <GalaxySVG size={520} />
      </CosmicAnchor>

      {/* Nebula — purple, behind about */}
      <CosmicAnchor target="#about" frac={0.4} side="right" offset={-200} width={900} height={700} scrollSpeed={0.6} className="nebula violet visible">
      </CosmicAnchor>

      {/* Asteroid belt — between Mars (about) and Jupiter (project 1) */}
      <CosmicAnchor target={'#work .project[data-i="0"]'} frac={-0.15} side="center" offset={120} width={900} height={120} scrollSpeed={1.2}>
        <AsteroidBelt width={900} height={120} count={70} />
      </CosmicAnchor>

      {/* Nebula — blue, around project 2 */}
      <CosmicAnchor target={'#work .project[data-i="1"]'} frac={0.5} side="right" offset={-100} width={800} height={600} scrollSpeed={0.7} className="nebula blue visible">
      </CosmicAnchor>

      {/* Black hole — dramatic, between projects 2 and 3 */}
      <CosmicAnchor target={'#work .project[data-i="2"]'} frac={-0.1} side="left" offset={-80} width={300} height={300} scrollSpeed={0.9}>
        <BlackHole size={300} />
      </CosmicAnchor>

      {/* Nebula — pink, project 3 */}
      <CosmicAnchor target={'#work .project[data-i="3"]'} frac={0.5} side="left" offset={-200} width={900} height={700} scrollSpeed={0.6} className="nebula pink visible">
      </CosmicAnchor>

      {/* Nebula — cyan, contact area */}
      <CosmicAnchor target="#contact" frac={0.5} side="left" offset={-300} width={1100} height={800} scrollSpeed={0.5} className="nebula cyan visible">
      </CosmicAnchor>

      {/* Comets — continuous CSS-animated, sit outside scroll anchoring (fixed in page) */}
      {/* (Comets rendered separately at App root so they escape .page's stacking context.) */}
    </div>
  );
}

window.StarField = StarField;
window.SolarSystem = SolarSystem;
window.CosmicObjects = CosmicObjects;

function Comets() {
  return (
    <div className="comet-layer" aria-hidden="true">
      <span className="comet c1"></span>
      <span className="comet c2"></span>
      <span className="comet c3"></span>
    </div>
  );
}
window.Comets = Comets;
