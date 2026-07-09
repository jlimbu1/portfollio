import st from '../styles/App.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faCode, faArrowRight } from '@fortawesome/free-solid-svg-icons'

function Projects() {
    return (
        <div id='projects' className={st.container}>
            <h2>Projects</h2>

            <div className={st.card}>
                <h4>Ticket Challenger</h4>
                <div className="details">
                    <p><FontAwesomeIcon icon={faCode} className={st.icon} /> HTML5, CSS3, JavaScript</p>
                    <p><FontAwesomeIcon icon={faLink} className={st.icon} /> <a href="https://github.com/jlimbu1/ticket-challenger" target="_blank" rel="noreferrer noopener">github.com/jlimbu1/ticket-challenger</a></p>
                    <p><FontAwesomeIcon icon={faArrowRight} className={st.icon} /> An online ticket purchasing experience simulator to practice ticket-nabbing skills.</p>
                </div>
            </div>

            <div className={st.card}>
                <h4>MOOC Web Platform for ARM Assembly Language</h4>
                <div className="details">
                    <p><FontAwesomeIcon icon={faCode} className={st.icon} /> MongoDB, ExpressJS, ReactJS, NodeJS, Docker, Kubernetes</p>
                    <p><FontAwesomeIcon icon={faLink} className={st.icon} /> <a href="https://drive.google.com/file/d/16zJW9AI0NrY946dJSZ8ZFHIefUuvtC9p/view?usp=sharing" target="_blank" rel="noreferrer noopener">Video Demo</a></p>
                    <p><FontAwesomeIcon icon={faArrowRight} className={st.icon} /> A web application for university courses teaching ARM assembly language programming. No installation or hardware required. Built with the MERN stack and deployed via Docker on DigitalOcean Kubernetes.</p>
                </div>
            </div>

            <div className={st.card}>
                <h4>Danger Dungeon (Browser Game)</h4>
                <div className="details">
                    <p><FontAwesomeIcon icon={faCode} className={st.icon} /> HTML5, CSS3, JavaScript, WebSocket</p>
                    <p><FontAwesomeIcon icon={faLink} className={st.icon} /> <a href="https://drive.google.com/file/d/1VyiSmQ8MtSxPNo72K501zlJUbuuvc9ei/view?usp=sharing" target="_blank" rel="noreferrer noopener">Video Demo</a></p>
                    <p><FontAwesomeIcon icon={faArrowRight} className={st.icon} /> A JavaScript-intensive 2-player browser game featuring sprite animations with internal frame timers, real-time player movement sync, and monster spawning via WebSockets.</p>
                </div>
            </div>

            <div className={st.card}>
                <h4>Arduino Game Boy</h4>
                <div className="details">
                    <p><FontAwesomeIcon icon={faCode} className={st.icon} /> C/C++, Arduino, OOP</p>
                    <p><FontAwesomeIcon icon={faLink} className={st.icon} /> <a href="https://drive.google.com/file/d/12XV0AEYPPKn6YgKdmOQXr42JPOreNfrJ/view?usp=sharing" target="_blank" rel="noreferrer noopener">Video Demo</a></p>
                    <p><FontAwesomeIcon icon={faArrowRight} className={st.icon} /> A Game Boy device built with Arduino as the microcontroller. Written in C++ using OOP methodology with LCD screen library for drawing platforms and entities.</p>
                </div>
            </div>

            <div className={st.card}>
                <h4>Game Guide Page</h4>
                <div className="details">
                    <p><FontAwesomeIcon icon={faCode} className={st.icon} /> HTML5, CSS3, JavaScript</p>
                    <p><FontAwesomeIcon icon={faLink} className={st.icon} /> <a href="https://chillis.netlify.app" target="_blank" rel="noreferrer noopener">chillis.netlify.app</a></p>
                    <p><FontAwesomeIcon icon={faArrowRight} className={st.icon} /> An information hub for an MMORPG guild, designed to be simple enough for other members to contribute to over time.</p>
                </div>
            </div>
        </div>
    )
}

export default Projects;
