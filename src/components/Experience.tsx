import { useReveal } from '../hooks/useReveal';
import { cv, type Experience as ExperienceItem } from '../data/cv';

function ExperienceCard({
  item,
  index,
  isLast,
}: {
  item: ExperienceItem;
  index: number;
  isLast: boolean;
}) {
  const [ref, visible] = useReveal();
  const delayClass = `d${Math.min(index + 1, 5)}`;

  return (
    <div
      className={`exp-entry reveal ${delayClass}${visible ? ' visible' : ''}${isLast ? ' last' : ''}`}
      ref={ref as React.RefObject<HTMLDivElement>}
    >
      <div className='exp-dot' />
      <div className='exp-card'>
        <div className='exp-header'>
          <div className='exp-company'>{item.company}</div>
          <div className='exp-period'>{item.period}</div>
        </div>
        <div className='exp-meta'>
          <span className='exp-role'>{item.role}</span>
          <span className='exp-type'>{item.type} · {item.location}</span>
        </div>
        <p className='exp-blurb'>{item.blurb}</p>
        <div className='exp-stack'>
          {item.stack.map((s) => (
            <span key={s} className='exp-tag'>
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const [ref, visible] = useReveal();

  return (
    <section className='section experience' id='experience'>
      <div className='container inner'>
        <div className='exp-l'>
          <div className={`eyebrow reveal${visible ? ' visible' : ''}`} ref={ref as React.RefObject<HTMLDivElement>}>
            Experience
          </div>
          <h2 className={`reveal d1${visible ? ' visible' : ''}`}>
            Where I've <span className='accent'>shipped.</span>
          </h2>
          <p className={`lead reveal d2${visible ? ' visible' : ''}`}>
            6+ years across AI, SaaS,
            <br />
            and enterprise integration.
          </p>
        </div>

        <div className='exp-timeline'>
          {cv.experience.map((item, i) => (
            <ExperienceCard
              key={item.company + item.period}
              item={item}
              index={i}
              isLast={i === cv.experience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
