import st from './styles/App.module.scss'
import Nav from './pages/Nav';
import Abouts from './pages/Abouts';
import Edus from './pages/Edus';
import Exps from './pages/Exps';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Footer from './pages/Footer';

function App() {
  return (
    <div className={`${st.App} d-flex flex-column min-vh-100`}>
      <Nav />
      <main className={`${st.main_container} container flex-grow-1`}>
        <Abouts />
        <Edus />
        <Exps />
        <Projects />
        <Skills />
        <Footer />
      </main>
    </div>
  );
}

export default App;