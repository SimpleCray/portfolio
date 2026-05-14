interface Dot {
  x: number;
  y: number;
  r: number;
  d: number;
}

interface Props {
  width?: number;
  height?: number;
  count?: number;
}

function makeDots(count: number): Dot[] {
  const arr: Dot[] = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      r: 1.5 + Math.random() * 4,
      d: Math.random() * 4,
    });
  }
  return arr;
}

// Generated once at module load — count is fixed per usage site
const DEFAULT_DOTS = makeDots(70);

export default function AsteroidBelt({ width = 700, height = 140, count = 70 }: Props) {
  const dots = count === 70 ? DEFAULT_DOTS : makeDots(count);

  return (
    <div className='asteroid-belt visible' style={{ width, height, position: 'relative' }}>
      {dots.map((d, i) => (
        <span
          key={i}
          className='asteroid'
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.r * 2,
            height: d.r * 2,
            animationDelay: `${d.d}s`,
          }}
        />
      ))}
    </div>
  );
}
