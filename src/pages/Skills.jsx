import st from '../styles/App.module.scss'
import useScrollReveal from '../hooks/useScrollReveal'

const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
};

function Chip({ icon, label, target }) {
    return (
        <li onClick={() => target && scrollTo(target)} title={target ? `Jump to ${label} usage` : ''}>
            {icon && <i className={icon}></i>}
            {label}
        </li>
    );
}

function Skills() {
    const [ref, visible] = useScrollReveal();

    return (
        <div id='skills' className={st.container}>
            <div ref={ref} className={`${st.reveal} ${visible ? st.visible : ''}`}>
            <h2>Skills</h2>

            <h4>Programming Languages</h4>
            <div className={st.skills}>
                <ul>
                    <Chip icon="devicon-c-plain" label="C" target="arduino-gameboy" />
                    <Chip icon="devicon-cplusplus-plain" label="C++" target="arduino-gameboy" />
                    <Chip icon="devicon-java-plain-wordmark" label="Java" target="projects" />
                    <Chip icon="devicon-javascript-plain" label="JavaScript" target="experiences" />
                    <Chip icon="devicon-typescript-plain" label="TypeScript" target="experiences" />
                    <Chip icon="devicon-nodejs-plain-wordmark" label="NodeJS" target="arm-mooc" />
                </ul>
            </div>

            <h4>Frontend</h4>
            <div className={st.skills}>
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

            <h4>Backend &amp; Database</h4>
            <div className={st.skills}>
                <ul>
                    <Chip icon="devicon-express-original" label="ExpressJS" target="arm-mooc" />
                    <Chip icon="devicon-nestjs-plain" label="NestJS" target="fletrix" />
                    <Chip icon="devicon-mongodb-plain-wordmark" label="MongoDB" target="fletrix" />
                    <Chip icon="devicon-socketio-original" label="Socket.IO" target="danger-dungeon" />
                    <Chip label="JWT" target="experiences" />
                    <Chip label="Microservices" target="experiences" />
                </ul>
            </div>

            <h4>Tools &amp; Platforms</h4>
            <div className={st.skills}>
                <ul>
                    <Chip icon="devicon-docker-plain" label="Docker" target="arm-mooc" />
                    <Chip icon="devicon-kubernetes-plain" label="Kubernetes" target="arm-mooc" />
                    <Chip icon="devicon-git-plain" label="Git" target="projects" />
                    <Chip icon="devicon-linux-plain" label="Linux" target="projects" />
                    <Chip icon="devicon-amazonwebservices-plain-wordmark" label="AWS EC2" target="arm-mooc" />
                    <Chip icon="devicon-arduino-plain-wordmark" label="Arduino" target="arduino-gameboy" />
                </ul>
            </div>

            <h4>Spoken Languages</h4>
            <div className={st.skills}>
                <ul>
                    <li className={st.noAction}>English (Fluent)</li>
                    <li className={st.noAction}>Nepali (Native)</li>
                    <li className={st.noAction}>Cantonese (Conversational)</li>
                </ul>
            </div>
        </div>
        </div>
    )
}

export default Skills;
