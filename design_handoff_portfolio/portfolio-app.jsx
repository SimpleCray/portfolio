/* global React, ReactDOM, CV */
/* Portfolio app — SimpleCray */

const { useState, useEffect, useRef } = React;

// ────────── Custom Cursor (subtle) ──────────
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [hidden, setHidden] = useState(true);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    let rx = 0, ry = 0, dx = 0, dy = 0;
    let raf;
    const onMove = (e) => {
      dx = e.clientX; dy = e.clientY;
      if (dot.current) {
        dot.current.style.left = dx + 'px';
        dot.current.style.top = dy + 'px';
      }
      if (hidden) setHidden(false);
    };
    const tick = () => {
      rx += (dx - rx) * 0.18;
      ry += (dy - ry) * 0.18;
      if (ring.current) {
        ring.current.style.left = rx + 'px';
        ring.current.style.top = ry + 'px';
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onOver = (e) => {
      const t = e.target;
      if (!t || !t.closest) return;
      setHover(!!t.closest('a, button, [data-hover], image-slot, input, textarea, .project-media'));
    };
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <React.Fragment>
      <div ref={dot} className={`cursor ${hidden ? 'hidden' : ''}`}></div>
      <div ref={ring} className={`cursor-ring ${hidden ? 'hidden' : ''} ${hover ? 'hover' : ''}`}></div>
    </React.Fragment>
  );
}

// ────────── Nav with scroll spy ──────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy
  useEffect(() => {
    const ids = ['home', 'about', 'work', 'contact'];
    const els = ids.map(id => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'work', label: 'Work' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className='container inner'>
        <a href='#home' className='brand'>
          SimpleCray<span className='dot'>.</span>
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

// ────────── Hero ──────────
function Hero() {
  return (
    <section className='hero' id='home'>
      <div className='container inner'>
        <div className='hero-l'>
          <div className='hero-greeting'>
            Hello<span className='dot'>.</span>
          </div>
          <div className='hero-sub'>I'm SimpleCray</div>
          <h1 className='hero-title'>
            Senior <span className='accent'>Fullstack</span>
            <br />
            Engineer
          </h1>
          <div className='hero-ctas'>
            <a className='btn btn-primary' href='#contact' data-hover>
              Got a project? <span className='arr'>→</span>
            </a>
            <a className='btn btn-ghost' href='#work' data-hover>
              See my work
            </a>
          </div>
        </div>

        <div className='hero-r'>
          <div className='portrait-wrap' data-hover>
            <div className='portrait-glow'></div>
            <div className='portrait-ring r3'></div>
            <div className='portrait-ring r2'></div>
            <div className='portrait-ring'></div>
            <span className='portrait-quote l'>&lt;</span>
            <span className='portrait-quote r'>&gt;</span>
            <div className='portrait-frame'>
              <image-slot
                id='portrait'
                shape='circle'
                placeholder='Drop your portrait'
              ></image-slot>
            </div>
          </div>
        </div>
      </div>

      <div className='hero-scroll-cue'>Scroll</div>
    </section>
  );
}

// ────────── Skills strip ──────────
function SkillsStrip() {
  const items = ['React', 'Next.js', 'TypeScript', 'Node.js', 'WebSockets', 'AWS', 'PostgreSQL'];
  return (
    <div className="skills-strip">
      <div className="container row">
        {items.map((it, i) => (
          <span
            key={it}
            className="item"
            data-hover
            style={{ animationDelay: `${0.1 + i * 0.06}s` }}
          >
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}

// ────────── Counter-up hook ──────────
function useCounter(target, start, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf, t0;
    const step = (t) => {
      if (!t0) t0 = t;
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return val;
}

// ────────── Reveal helper ──────────
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      });
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

// ────────── About ──────────
function About() {
  const [ref, visible] = useReveal();
  // Compute YOE from 2020
  const now = new Date();
  const yoe = now.getFullYear() - 2020 + (now.getMonth() >= 5 ? 0 : 0);
  const countYoe = useCounter(yoe, visible, 1200);

  return (
    <section className='section about' id='about' ref={ref}>
      <div className='container inner'>
        <div className='about-l'>
          <div className={`eyebrow reveal ${visible ? 'visible' : ''}`}>About me</div>
          <h2 className={`reveal d1 ${visible ? 'visible' : ''}`}>
            Building <span className='accent'>scalable products</span> that ship.
          </h2>
          <p className={`lead reveal d2 ${visible ? 'visible' : ''}`}>
            Based in Saigon. Working with teams worldwide.
          </p>
        </div>

        <div className='about-r'>
          <p className={`reveal d1 ${visible ? 'visible' : ''}`}>
            I'm SimpleCray — a Senior Fullstack Engineer with{' '}
            <span className='yoe-number'>{countYoe}+</span> years of experience architecting
            real-time platforms, integration systems, and the AI tooling that lets small teams ship
            like big ones.
          </p>
          <p className={`reveal d2 ${visible ? 'visible' : ''}`}>
            I started shipping in 2020 and have since led frontend teams, owned architecture
            decisions, and quietly turned “this is going to be hard” into “this shipped Tuesday” —
            across remote teams in Australia, Denmark, and Vietnam.
          </p>

          <div className='about-pillars'>
            <div className={`about-pillar reveal d3 ${visible ? 'visible' : ''}`}>
              <div className='n'>/ 01</div>
              <h4>Real-time systems</h4>
              <p>WebSocket pipelines, event-driven backends, streaming LLM UI.</p>
            </div>
            <div className={`about-pillar reveal d4 ${visible ? 'visible' : ''}`}>
              <div className='n'>/ 02</div>
              <h4>Integration architecture</h4>
              <p>CRM/ERP middleware, OAuth, queue-based processing at multi-tenant scale.</p>
            </div>
            <div className={`about-pillar reveal d5 ${visible ? 'visible' : ''}`}>
              <div className='n'>/ 03</div>
              <h4>Frontend leadership</h4>
              <p>Architecture patterns, design systems, mentoring teams across products.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────── Projects ──────────
function ProjectRow({ project, index, dataI }) {
  const [ref, visible] = useReveal();
  const alt = index % 2 === 1;
  return (
    <div className={`project ${alt ? 'alt' : ''}`} data-i={dataI} ref={ref}>
      <div className={`project-media reveal ${alt ? 'd1' : ''} ${visible ? 'visible' : ''}`} data-hover>
        <span className="frame-corner tl"></span>
        <span className="frame-corner br"></span>
        <image-slot
          id={`proj-${project.id}`}
          shape="rect"
          placeholder={`Drop screenshot · ${project.client.split('→').pop().trim()}`}
        ></image-slot>
      </div>
      <div className={`project-body reveal ${alt ? '' : 'd1'} ${visible ? 'visible' : ''}`}>
        <h3>{project.title}</h3>
        <div className="project-tags">
          {project.stack.map(s => (
            <span key={s} className="project-tag" data-hover>{s}</span>
          ))}
        </div>
        <p>{project.summary}</p>
        <div className="project-links">
          <a className="project-link primary" href="#" data-hover>
            View case study <span className="arr">↗</span>
          </a>
          <a className="project-link ghost" href="#" data-hover>
            Live demo <span className="arr">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [ref, visible] = useReveal();
  return (
    <section className="section projects" id="work">
      <div className="container">
        <div className={`projects-head reveal ${visible ? 'visible' : ''}`} ref={ref}>
          <div className="eyebrow" style={{ justifyContent: 'center', display: 'inline-flex' }}>
            Selected work
          </div>
          <h2>Projects</h2>
          <div className="underline"></div>
        </div>
        {window.CV.featured.map((p, i) => (
          <ProjectRow key={p.id} project={p} index={i} dataI={i} />
        ))}
      </div>
    </section>
  );
}

// ────────── Contact ──────────
function Contact() {
  const [ref, visible] = useReveal();
  const cv = window.CV;
  const methods = [
    { label: 'Email', value: cv.email, href: `mailto:${cv.email}` },
    { label: 'LinkedIn', value: cv.linkedin, href: `https://${cv.linkedin}` },
    { label: 'GitHub', value: cv.github, href: `https://${cv.github}` },
    { label: 'Phone', value: cv.phone, href: `tel:${cv.phone}` },
    { label: 'Location', value: 'Ho Chi Minh City, Vietnam', href: '#' },
  ];
  return (
    <section className="section contact" id="contact" ref={ref}>
      <div className="container inner">
        <div className="contact-l">
          <div className={`eyebrow reveal ${visible ? 'visible' : ''}`}>Contact</div>
          <h2 className={`reveal d1 ${visible ? 'visible' : ''}`}>
            Have a project?<br/>Let's <span className="accent">talk.</span>
          </h2>
          <p className={`reveal d2 ${visible ? 'visible' : ''}`}>
            Currently accepting briefs for fullstack contracts, frontend leadership,
            and real-time integration work. Reach out through any channel.
          </p>
        </div>

        <div className="contact-methods">
          {methods.map((m, i) => (
            <a
              key={m.label}
              href={m.href}
              className={`contact-method reveal d${i+1} ${visible ? 'visible' : ''}`}
              data-hover
            >
              <span className="label">{m.label}</span>
              <span className="value">{m.value}</span>
              <span className="contact-arrow">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────── Footer ──────────
function Footer() {
  const cv = window.CV;
  return (
    <footer className='footer'>
      <div className='container inner'>
        <div className='brand'>
          SimpleCray<span style={{ color: 'var(--accent)' }}>.</span>
        </div>
        <div className='copy'>Designed & built with care, © 2026</div>
        <div className='socials'>
          <a href={`mailto:${cv.email}`} aria-label='Email' data-hover>
            <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
              <path d='M4 4h16v16H4z' />
              <path d='M22 6l-10 7L2 6' />
            </svg>
          </a>
          <a href={`https://${cv.github}`} aria-label='GitHub' data-hover>
            <svg viewBox='0 0 24 24' fill='currentColor'>
              <path d='M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.04c-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.05.78 2.12v3.14c0 .31.21.67.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z' />
            </svg>
          </a>
          <a href={`https://${cv.linkedin}`} aria-label='LinkedIn' data-hover>
            <svg viewBox='0 0 24 24' fill='currentColor'>
              <path d='M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9.5h3.41v1.5h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.85zM5.34 7.99a2.06 2.06 0 0 1-2.06-2.07c0-1.14.92-2.07 2.06-2.07s2.06.93 2.06 2.07c0 1.14-.92 2.07-2.06 2.07zm1.78 12.46H3.56V9.5h3.56v10.95zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z' />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

// ────────── App ──────────
const ACCENT_PRESETS = {
  violet:  { c: '#a855f7', d: '#9333ea', s: '#c084fc', rgb: '168, 85, 247' },
  cyan:    { c: '#22d3ee', d: '#06b6d4', s: '#67e8f9', rgb: '34, 211, 238' },
  gold:    { c: '#fbbf24', d: '#f59e0b', s: '#fcd34d', rgb: '251, 191, 36' },
  magenta: { c: '#ec4899', d: '#db2777', s: '#f9a8d4', rgb: '236, 72, 153' },
  mint:    { c: '#34d399', d: '#10b981', s: '#6ee7b7', rgb: '52, 211, 153' },
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "violet"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const p = ACCENT_PRESETS[t.accent] || ACCENT_PRESETS.violet;
    const r = document.documentElement.style;
    r.setProperty('--accent', p.c);
    r.setProperty('--accent-deep', p.d);
    r.setProperty('--accent-soft', p.s);
    r.setProperty('--accent-rgb', p.rgb);
  }, [t.accent]);

  return (
    <React.Fragment>
      <StarField />
      <Cursor />
      <Nav />
      <div className="page">
        <SolarSystem />
        <CosmicObjects />
        <Hero />
        <SkillsStrip />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </div>
      <Comets />

      <TweaksPanel title="Cosmos">
        <TweakSection label="Accent color">
          <TweakColor
            label="Palette"
            value={ACCENT_PRESETS[t.accent].c}
            options={Object.values(ACCENT_PRESETS).map(p => p.c)}
            onChange={(c) => {
              const key = Object.keys(ACCENT_PRESETS).find(k => ACCENT_PRESETS[k].c === c);
              setTweak('accent', key || 'violet');
            }}
          />
        </TweakSection>
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
