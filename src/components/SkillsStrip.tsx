// Duplicate the array so the marquee loops seamlessly (scroll -50% = one full cycle)
const items = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Express.js',
  'WebSocket',
  'REST API',
  'Webhooks',
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'AWS',
  'Docker',
  'CI/CD',
  'Redux',
  'TanStack Query',
  'Zustand',
  'Tailwind CSS',
  'Material UI',
  'Framer Motion',
  'Jest',
  'Playwright',
  'Claude AI',
  'Cursor AI',
  'HTML5',
  'CSS3',
];

export default function SkillsStrip() {
  return (
    <div className='skills-strip'>
      <div className='skills-track'>
        {/* Two identical rows — animating -50% brings us back to the start */}
        {[0, 1].map((copy) => (
          <div key={copy} className='skills-row' aria-hidden={copy === 1}>
            {items.map((it) => (
              <span key={it} className='item' data-hover=''>
                {it}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
