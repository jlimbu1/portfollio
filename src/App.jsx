import React from 'react';
import Nav from './pages/Nav';
import Abouts from './pages/Abouts';
import Skills from './pages/Skills';
import Timeline from './components/Timeline/Timeline';
import Projects from './pages/Projects';
import Footer from './pages/Footer';
import styles from './styles/App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <Nav />
      <main>
        <Abouts />
        <Skills />
        <Timeline />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}

export default App;