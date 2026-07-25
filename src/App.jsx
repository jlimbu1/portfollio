import React from 'react';
import Nav from './pages/Nav';
import Abouts from './pages/Abouts';
import Edus from './pages/Edus';
import Exps from './pages/Exps';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Footer from './pages/Footer';
import { useScrollSpy } from './hooks/useScrollSpy';
import { useScrollReveal } from './hooks/useScrollReveal';
import styles from './styles/App.module.scss';

const sectionIds = ['about', 'education', 'experience', 'projects', 'skills', 'contact'];

function App() {
  const activeSection = useScrollSpy(sectionIds, 100);

  return (
    <div className={styles.app}>
      <Nav active={activeSection} />
      <main>
        <SectionWrapper id="about" Component={Abouts} />
        <SectionWrapper id="education" Component={Edus} />
        <SectionWrapper id="experience" Component={Exps} />
        <SectionWrapper id="projects" Component={Projects} />
        <SectionWrapper id="skills" Component={Skills} />
        <SectionWrapper id="contact" Component={Footer} />
      </main>
    </div>
  );
}

function SectionWrapper({ id, Component }) {
  const [ref, visible] = useScrollReveal(0.1);
  return (
    <section id={id} ref={ref} className={visible ? 'revealed' : ''}>
      <Component />
    </section>
  );
}

export default App;