import st from './styles/App.module.scss'
import Nav from './pages/Nav';
import Abouts from './pages/Abouts';
import Edus from './pages/Edus';
import Exps from './pages/Exps';
import Projects from './pages/Projects';
import SkillsRadar from './components/SkillsRadar/SkillsRadar';
import Footer from './pages/Footer';

function App() {
  return (
    <div className={st.App}>
      <Nav />
      <main className={st.main_container}>
        <Abouts />
        <Edus />
        <Exps />
        <Projects />
        <SkillsRadar />
        <Footer />
      </main>
    </div>
  );
}

export default App;
