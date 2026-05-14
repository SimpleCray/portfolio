export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container inner">
        <div className="hero-l">
          <div className="hero-greeting">
            Hello<span className="dot">.</span>
          </div>
          <div className="hero-sub">I'm Hai Duong</div>
          <h1 className="hero-title">
            Senior <span className="accent">Fullstack</span>
            <br />
            Engineer
          </h1>
          <div className="hero-ctas">
            <a className="btn btn-primary" href="#contact" data-hover="">
              Got a project? <span className="arr">→</span>
            </a>
            <a className="btn btn-ghost" href="#work" data-hover="">
              See my work
            </a>
          </div>
        </div>

        <div className="hero-r">
          <div className="portrait-wrap" data-hover="">
            <div className="portrait-glow" />
            <div className="portrait-ring r3" />
            <div className="portrait-ring r2" />
            <div className="portrait-ring" />
            <span className="portrait-quote l">&lt;</span>
            <span className="portrait-quote r">&gt;</span>
            <div className="portrait-frame">
              <div className="portrait-placeholder">Portrait</div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-cue">Scroll</div>
    </section>
  )
}
