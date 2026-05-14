import { useReveal } from '../hooks/useReveal';
import { useCounter } from '../hooks/useCounter';

export default function About() {
  const [ref, visible] = useReveal();
  const yoe = new Date().getFullYear() - 2020;
  const countYoe = useCounter(yoe, visible, 1200);

  return (
    <section className='section about' id='about' ref={ref as React.RefObject<HTMLElement>}>
      <div className='container inner'>
        <div className='about-l'>
          <div className={`eyebrow reveal${visible ? ' visible' : ''}`}>About me</div>
          <h2 className={`reveal d1${visible ? ' visible' : ''}`}>
            Building <span className='accent'>scalable products</span> that ship.
          </h2>
          <p className={`lead reveal d2${visible ? ' visible' : ''}`}>
            Based in Saigon. Working with teams worldwide.
          </p>
        </div>

        <div className='about-r'>
          <p className={`reveal d1${visible ? ' visible' : ''}`}>
            I'm Hai Duong — a Senior Fullstack Engineer with{' '}
            <span className='yoe-number'>{countYoe}+</span> years of experience architecting
            real-time platforms, integration systems, and the AI tooling that lets small teams ship
            like big ones.
          </p>
          <p className={`reveal d2${visible ? ' visible' : ''}`}>
            I started shipping in 2020 and have since led frontend teams, owned architecture
            decisions, and quietly turned "this is going to be hard" into "this shipped Tuesday" —
            across remote teams in Australia, Denmark, and Vietnam.
          </p>

          <div className='about-pillars'>
            <div className={`about-pillar reveal d3${visible ? ' visible' : ''}`}>
              <div className='n'>/ 01</div>
              <h4>Real-time systems</h4>
              <p>WebSocket pipelines, event-driven backends, streaming LLM UI.</p>
            </div>
            <div className={`about-pillar reveal d4${visible ? ' visible' : ''}`}>
              <div className='n'>/ 02</div>
              <h4>Integration architecture</h4>
              <p>CRM/ERP middleware, OAuth, queue-based processing at multi-tenant scale.</p>
            </div>
            <div className={`about-pillar reveal d5${visible ? ' visible' : ''}`}>
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
