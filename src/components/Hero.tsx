function smoothScrollTo(targetY: number, duration: number) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let start: number | null = null;

  function step(t: number) {
    if (!start) start = t;
    const elapsed = t - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4);
    window.scrollTo(0, startY + diff * ease);
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

export default function Hero() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('about');
    if (target) smoothScrollTo(target.offsetTop - 80, 1200);
  };

  return (
    <section className='hero' id='home'>
      <div className='container inner'>
        <div className='hero-l'>
          <div className='hero-greeting'>
            Hello<span className='dot'>.</span>
          </div>
          <div className='hero-sub'>
            <span className='hero-sub-im'>I'm </span>
            <span className='hero-sub-name'>
              Hai Duong
              {/* <span className='hero-sub-alias'>(Cray)</span> */}
            </span>
          </div>
          <h1 className='hero-title'>
            Senior <span className='accent'>Fullstack</span>
            <br />
            Engineer
          </h1>
          <div className='hero-ctas'>
            <a className='btn btn-primary' href='#contact' data-hover=''>
              Contact me <span className='arr'>→</span>
            </a>
            <a className='btn btn-ghost' href='#work' data-hover=''>
              See my work
            </a>
          </div>
        </div>

        <div className='hero-r'>
          <div className='portrait-wrap' data-hover=''>
            <div className='portrait-glow' />
            <div className='portrait-ring r3' />
            <div className='portrait-ring r2' />
            <div className='portrait-ring' />
            <span className='portrait-quote l'>&lt;</span>
            <span className='portrait-quote r'>&gt;</span>
            <div className='portrait-frame'>
              <div className='portrait-placeholder'>Portrait</div>
            </div>
          </div>
        </div>
      </div>

      <a
        className='hero-scroll-cue'
        href='#about'
        aria-label='Scroll to about'
        onClick={handleScroll}
      >
        About me
      </a>
    </section>
  );
}
