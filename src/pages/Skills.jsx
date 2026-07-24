import st from '../styles/App.module.scss'
import useScrollReveal from '../hooks/useScrollReveal'

const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
};

function Chip({ icon, label, target }) {
    return (
        <li 
            onClick={() => target && scrollTo(target)} 
            title={target ? `Jump to ${label} usage` : ''}
            role="button"
            tabIndex={0}
            aria-label={target ? `${label}: jump to ${target} section` : label}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (target) scrollTo(target);
                }
            }}
        >
            {icon && <i className={icon} aria-hidden="true"></i>}
            {label}
        </li>
    );
}

function Skills() {
    const [ref, visible] = useScrollReveal();

    return (
        <div id='skills' className={st.container} role="region" aria-label="Skills section">
            <div ref={ref} className={`${st.reveal} ${visible ? st.visible : ''}`}>
            <h2 id="skills-heading">Skills</h2>

            <h4 id="skills-languages-heading">Programming Languages</h4>
            <div className={st.skills} role="list" aria-labelledby="skills-languages-heading">
                <ul>
                    <Chip icon="devicon-c-plain" label="C" target="arduino-gameboy" />
                    <Chip icon="devicon-cplusplus-plain" label="C++" target="arduino-gameboy" />
                    <Chip icon="devicon-java-plain-wordmark" label="Java" target="projects" />
                    <Chip icon="devicon-javascript-plain" label="JavaScript" target="experiences" />
                    <Chip icon="devicon-typescript-plain" label="TypeScript" target="experiences" />
                    <Chip icon="devicon-nodejs-plain-wordmark" label="NodeJS" target="arm-mooc" />
                </ul>
            </div>

            <h4 id="skills-frontend-heading">Frontend</h4>
            <div className={st.skills} role="list" aria-labelledby="skills-frontend-heading">
                <ul>
                    <Chip icon="devicon-vuejs-plain-wordmark" label="Vue 2/3" target="experiences" />
                    <Chip icon="devicon-react-original-wordmark" label="React" target="wealthskey" />
                    <Chip icon="devicon-nextjs-plain" label="NextJS" target="wealthskey" />
                    <Chip icon="devicon-nuxtjs-plain" label="NuxtJS" target="experiences" />
                    <Chip icon="devicon-tailwindcss-plain" label="Tailwind CSS" target="experiences" />
                    <Chip icon="devicon-bootstrap-plain" label="Bootstrap" target="experiences" />
                    <Chip icon="devicon-html5-plain-wordmark" label="HTML5" target="projects" />
                    <Chip icon="devicon-css3-plain-wordmark" label="CSS3" target="projects" />
                </ul>
            </div>

            <h4 id="skills-backend-heading">Backend &amp; Database</h4>
            <div className={st.skills} role="list" aria-labelledby="skills-backend-heading">
                <ul>
                    <Chip icon="devicon-express-original" label="ExpressJS" target="arm-mooc" />
                    <Chip icon="devicon-nestjs-plain" label="NestJS" target="fletrix" />
                    <Chip icon="devicon-mongodb-plain-wordmark" label="MongoDB" target="fletrix" />
                    <Chip icon="devicon-socketio-original" label="Socket.IO" target="danger-dungeon" />
                    <Chip label="JWT" target="experiences" />
                    <Chip label="Microservices" target="experiences" />
                </ul>
            </div>

            <h4 id="skills-tools-heading">Tools &amp; Platforms</h4>
            <div className={st.skills} role="list" aria-labelledby="skills-tools-heading">
                <ul>
                    <Chip icon="devicon-docker-plain" label="Docker" target="arm-mooc" />
                    <Chip icon="devicon-kubernetes-plain" label="Kubernetes" target="arm-mooc" />
                    <Chip icon="devicon-git-plain" label="Git" target="projects" />
                    <Chip icon="devicon-linux-plain" label="Linux" target="projects" />
                    <Chip icon="devicon-amazonwebservices-plain-wordmark" label="AWS EC2" target="arm-mooc" />
                    <Chip icon="devicon-arduino-plain-wordmark" label="Arduino" target="arduino-gameboy" />
                </ul>
            </div>

            <h4 id="skills-spoken-heading">Spoken Languages</h4>
            <div className={st.skills} role="list" aria-labelledby="skills-spoken-heading">
                <ul>
                    <li className={st.noAction} role="listitem">English (Fluent)</li>
                    <li className={st.noAction} role="listitem">Nepali (Native)</li>
                    <li className={st.noAction} role="listitem">Cantonese (Conversational)</li>
                </ul>
            </div>
        </div>
        </div>
    )
}

export default Skills;
