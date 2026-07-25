import React from 'react';
import Nav from './pages/Nav';
import Abouts from './pages/Abouts';
import Edus from './pages/Edus';
import Exps from './pages/Exps';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Footer from './pages/Footer';
import styles from './styles/App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <Nav />
      <main>
        <section id="about">
          <Abouts />
        </section>
        <section id="education">
          <Edus />
        </section>
        <section id="experience">
          <Exps />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="skills">
          <Skills />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;