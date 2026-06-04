'use client';

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
            Based in Ho Chi Minh city. Working with teams worldwide.
          </p>
        </div>

        <div className='about-r'>
          <p className={`reveal d1${visible ? ' visible' : ''}`}>
            I'm Cray — a Senior Fullstack Engineer with{' '}
            <span className='yoe-number'>{countYoe}+</span> years of experience designing and
            delivering scalable, high-performance web applications across SaaS, AI, and enterprise
            integration domains.
          </p>
          <p className={`reveal d2${visible ? ' visible' : ''}`}>
            Proven track record of owning end-to-end development—from architecture to
            deployment—across complex systems including real-time platforms, CRM/ERP integrations,
            and data-intensive applications using React, Next.js, Node.js, and TypeScript.
            <br /> Experienced leading cross-functional teams and mentoring engineers, driving
            technical excellence and consistent delivery across multiple projects.
          </p>

          <div className='about-pillars'>
            <div className={`about-pillar reveal d3${visible ? ' visible' : ''}`}>
              <div className='n'>01</div>
              <h4>Scalable systems design</h4>
              <p>Architecting distributed platforms for high-throughput, real-time applications.</p>
            </div>
            <div className={`about-pillar reveal d4${visible ? ' visible' : ''}`}>
              <div className='n'>02</div>
              <h4>Enterprise integration</h4>
              <p>
                Designing high performance and secure middleware across CRM, ERP, and multi-tenant
                ecosystems.
              </p>
            </div>
            <div className={`about-pillar reveal d5${visible ? ' visible' : ''}`}>
              <div className='n'>03</div>
              <h4>Technical leadership</h4>
              <p>
                Driving architecture standards, mentoring engineers, enabling predictable delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
