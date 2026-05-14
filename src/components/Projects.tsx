import { useReveal } from '../hooks/useReveal';
import { cv, type Project } from '../data/cv';

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [ref, visible] = useReveal();
  const alt = index % 2 === 1;

  return (
    <div
      className={`project${alt ? ' alt' : ''}`}
      data-i={index}
      ref={ref as React.RefObject<HTMLDivElement>}
    >
      <div
        className={`project-media reveal${alt ? ' d1' : ''}${visible ? ' visible' : ''}`}
        data-hover=''
      >
        <span className='frame-corner tl' />
        <span className='frame-corner br' />
        <div className='project-img-placeholder'>{project.client.split('→').pop()?.trim()}</div>
      </div>
      <div className={`project-body reveal${alt ? '' : ' d1'}${visible ? ' visible' : ''}`}>
        <h3>{project.title}</h3>
        <div className='project-tags'>
          {project.stack.map((s) => (
            <span key={s} className='project-tag' data-hover=''>
              {s}
            </span>
          ))}
        </div>
        <p>{project.summary}</p>
        <div className='project-links'>
          <a className='project-link primary' href='#' data-hover=''>
            View case study <span className='arr'>↗</span>
          </a>
          <a className='project-link ghost' href='#' data-hover=''>
            Live demo <span className='arr'>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [ref, visible] = useReveal();

  return (
    <section className='section projects' id='work'>
      <div className='container'>
        <div
          className={`projects-head reveal${visible ? ' visible' : ''}`}
          ref={ref as React.RefObject<HTMLDivElement>}
        >
          <div className='eyebrow' style={{ justifyContent: 'center', display: 'inline-flex' }}>
            Selected work
          </div>
          <h2>Projects</h2>
          <div className='underline' />
        </div>
        {cv.featured.map((p, i) => (
          <ProjectRow key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
