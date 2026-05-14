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
      {/* Desktop: media as separate grid cell */}
      <div
        className={`project-media project-media-desktop reveal${alt ? ' d1' : ''}${visible ? ' visible' : ''}`}
        data-hover=''
      >
        <span className='frame-corner tl' />
        <span className='frame-corner br' />
        <div className='project-img-placeholder'>
          <span className='project-img-label'>{project.name}</span>
        </div>
      </div>

      <div className={`project-body reveal${alt ? '' : ' d1'}${visible ? ' visible' : ''}`}>
        <div className='project-meta'>
          <span className='project-year'>{project.year}</span>
          <span className='project-role'>{project.role}</span>
        </div>
        <h3 className='project-name'>{project.name}</h3>

        {/* Mobile: media inline after project name, 16:9 */}
        <div className='project-media project-media-mobile' data-hover=''>
          <span className='frame-corner tl' />
          <span className='frame-corner br' />
          <div className='project-img-placeholder'>
            <span className='project-img-label'>{project.name}</span>
          </div>
        </div>

        <p>{project.summary}</p>
        <p className='project-tagline'>{project.title}</p>
        <ul className='project-bullets'>
          {project.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        <div className='project-tags'>
          {project.stack.map((s) => (
            <span key={s} className='project-tag' data-hover=''>
              {s}
            </span>
          ))}
        </div>
        {/* <div className='project-links'>
          <a className='project-link primary' href='#' data-hover=''>
            View case study <span className='arr'>↗</span>
          </a>
          <a className='project-link ghost' href='#' data-hover=''>
            Live demo <span className='arr'>↗</span>
          </a>
        </div> */}
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
