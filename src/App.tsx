import StarField from './components/space/StarField';
import SolarSystem from './components/space/SolarSystem';
import CosmicObjects from './components/space/CosmicObjects';
import Comets from './components/space/Comets';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import SkillsStrip from './components/SkillsStrip';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <StarField />
      <Cursor />
      <Nav />
      <div className='page'>
        <SolarSystem />
        <CosmicObjects />
        <Hero />
        <SkillsStrip />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </div>
      <Comets />
    </>
  );
}
