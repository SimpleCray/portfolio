import StarField from './components/space/StarField';
import SolarSystem from './components/space/SolarSystem';
import CosmicObjects from './components/space/CosmicObjects';
import Comets from './components/space/Comets';
import SpaceshipCursor from './components/SpaceshipCursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import SkillsStrip from './components/SkillsStrip';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const SHOW_COSMIC_OBJECTS = false;

export default function App() {
  return (
    <>
      <StarField />
      <SpaceshipCursor />
      <Nav />
      <div className='page'>
        {SHOW_COSMIC_OBJECTS && <SolarSystem />}
        {SHOW_COSMIC_OBJECTS && <CosmicObjects />}
        <Hero />
        <SkillsStrip />
        <About />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
      <Comets />
      <ScrollToTop />
    </>
  );
}
