import CosmicAnchor from './CosmicAnchor';
import GalaxySVG from './GalaxySVG';
import BlackHole from './BlackHole';
import AsteroidBelt from './AsteroidBelt';

export default function CosmicObjects() {
  return (
    <div className='cosmic-layer' aria-hidden='true'>
      <CosmicAnchor
        target='#home'
        frac={0.15}
        side='left'
        offset={-80}
        width={520}
        height={520}
        scrollSpeed={0.5}
      >
        <GalaxySVG size={520} />
      </CosmicAnchor>

      <CosmicAnchor
        target='#about'
        frac={0.4}
        side='right'
        offset={-200}
        width={900}
        height={700}
        scrollSpeed={0.6}
        className='nebula violet visible'
      />

      <CosmicAnchor
        target='#work .project[data-i="0"]'
        frac={-0.15}
        side='center'
        offset={120}
        width={1200}
        height={120}
        scrollSpeed={1.2}
      >
        <AsteroidBelt width={1200} height={120} count={70} />
      </CosmicAnchor>

      <CosmicAnchor
        target='#work .project[data-i="1"]'
        frac={0.5}
        side='right'
        offset={-100}
        width={800}
        height={600}
        scrollSpeed={0.7}
        className='nebula blue visible'
      />

      <CosmicAnchor
        target='#work .project[data-i="2"]'
        frac={-0.1}
        side='left'
        offset={-80}
        width={300}
        height={300}
        scrollSpeed={0.9}
      >
        <BlackHole size={300} />
      </CosmicAnchor>

      <CosmicAnchor
        target='#work .project[data-i="3"]'
        frac={0.5}
        side='left'
        offset={-200}
        width={900}
        height={700}
        scrollSpeed={0.6}
        className='nebula pink visible'
      />

      <CosmicAnchor
        target='#contact'
        frac={0.5}
        side='left'
        offset={-300}
        width={1100}
        height={800}
        scrollSpeed={0.5}
        className='nebula cyan visible'
      />
    </div>
  );
}
