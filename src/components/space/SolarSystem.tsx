import Planet, { type PlanetKind } from './Planet';

interface PlanetConfig {
  kind: PlanetKind;
  size: number;
  target: string;
  frac: number;
  side: 'left' | 'right';
  offset: number;
  scrollSpeed: number;
  opacity: number;
}

const planets: PlanetConfig[] = [
  {
    kind: 'earth',
    size: 380,
    target: '#home',
    frac: 0.5,
    side: 'right',
    offset: -160,
    scrollSpeed: 1.0,
    opacity: 0.88,
  },
  {
    kind: 'moon',
    size: 90,
    target: '#home',
    frac: 0.32,
    side: 'right',
    offset: 220,
    scrollSpeed: 1.6,
    opacity: 0.92,
  },
  {
    kind: 'mars',
    size: 320,
    target: '#about',
    frac: 0.5,
    side: 'left',
    offset: -240,
    scrollSpeed: 0.9,
    opacity: 0.7,
  },
  {
    kind: 'jupiter',
    size: 460,
    target: '#work .project[data-i="0"]',
    frac: 0.5,
    side: 'right',
    offset: -180,
    scrollSpeed: 0.85,
    opacity: 0.78,
  },
  {
    kind: 'saturn',
    size: 380,
    target: '#work .project[data-i="1"]',
    frac: 0.5,
    side: 'left',
    offset: -260,
    scrollSpeed: 0.75,
    opacity: 0.7,
  },
  {
    kind: 'uranus',
    size: 280,
    target: '#work .project[data-i="2"]',
    frac: 0.5,
    side: 'right',
    offset: -120,
    scrollSpeed: 1.0,
    opacity: 0.75,
  },
  {
    kind: 'neptune',
    size: 280,
    target: '#work .project[data-i="3"]',
    frac: 0.5,
    side: 'left',
    offset: -120,
    scrollSpeed: 1.05,
    opacity: 0.78,
  },
  {
    kind: 'sun',
    size: 500,
    target: '#contact',
    frac: 0.5,
    side: 'right',
    offset: -180,
    scrollSpeed: 0.55,
    opacity: 0.92,
  },
];

export default function SolarSystem() {
  return (
    <div className='solar-system' aria-hidden='true'>
      {planets.map((p, i) => (
        <Planet key={i} {...p} />
      ))}
    </div>
  );
}
