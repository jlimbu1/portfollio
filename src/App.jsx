import st from './styles/App.module.scss'
import Nav from './pages/Nav';
import Abouts from './pages/Abouts';
import Timeline from './pages/Timeline';
import Skills from './pages/Skills';
import Footer from './pages/Footer';

function App() {
  return (
    <div className={st.App}>
      <Nav />
      <main className={st.main_container}>
        <Abouts />
        <Timeline />
        <Skills />
        <Footer />
      </main>
    </div>
  );
}

export default App;
