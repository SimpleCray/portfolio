const items = ['React', 'Next.js', 'TypeScript', 'Node.js', 'WebSockets', 'AWS', 'PostgreSQL']

export default function SkillsStrip() {
  return (
    <div className="skills-strip">
      <div className="container row">
        {items.map((it, i) => (
          <span
            key={it}
            className="item"
            data-hover=""
            style={{ animationDelay: `${0.1 + i * 0.06}s` }}
          >
            {it}
          </span>
        ))}
      </div>
    </div>
  )
}
