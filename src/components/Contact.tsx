import { useReveal } from '../hooks/useReveal';
import { cv } from '../data/cv';

export default function Contact() {
  const [ref, visible] = useReveal();

  const methods = [
    { label: 'Email', value: cv.email, href: `mailto:${cv.email}` },
    { label: 'LinkedIn', value: cv.linkedin, href: `https://${cv.linkedin}` },
    { label: 'GitHub', value: cv.github, href: `https://${cv.github}` },
    { label: 'Phone', value: cv.phone, href: `tel:${cv.phone}` },
    { label: 'Location', value: 'Ho Chi Minh City, Vietnam', href: '#' },
  ];

  return (
    <section className='section contact' id='contact' ref={ref as React.RefObject<HTMLElement>}>
      <div className='container inner'>
        <div className='contact-l'>
          <div className={`eyebrow reveal${visible ? ' visible' : ''}`}>Contact</div>
          <h2 className={`reveal d1${visible ? ' visible' : ''}`}>
            Have a project?
            <br />
            Let's <span className='accent'>talk.</span>
          </h2>
          <p className={`reveal d2${visible ? ' visible' : ''}`}>
            Currently accepting briefs for fullstack contracts, frontend leadership, and real-time
            integration work. Reach out through any channel.
          </p>
        </div>

        <div className='contact-methods'>
          {methods.map((m, i) => (
            <a
              key={m.label}
              href={m.href}
              className={`contact-method reveal d${i + 1}${visible ? ' visible' : ''}`}
              data-hover=''
            >
              <span className='label'>{m.label}</span>
              <span className='value'>{m.value}</span>
              <span className='contact-arrow'>↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
