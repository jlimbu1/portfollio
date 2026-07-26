import React from 'react';
import Nav from './pages/Nav';
import Abouts from './pages/Abouts';
import Timeline from './components/Timeline/Timeline';
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
        <section id="timeline">
          <Timeline />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="contact">
          <Footer />
        </section>
      </main>
    </div>
  );
}

export default App;