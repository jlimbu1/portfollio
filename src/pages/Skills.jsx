import st from '../styles/App.module.scss'

function Skills() {
    return (
        <div id='skills' className={st.container}>
            <h2>Skills</h2>

            <h4>Programming Languages</h4>
            <div className={st.skills}>
                <ul>
                    <li><i className="devicon-c-plain"></i> C</li>
                    <li><i className="devicon-cplusplus-plain"></i> C++</li>
                    <li><i className="devicon-java-plain-wordmark"></i> Java</li>
                    <li><i className="devicon-javascript-plain"></i> JavaScript</li>
                    <li><i className="devicon-typescript-plain"></i> TypeScript</li>
                    <li><i className="devicon-nodejs-plain-wordmark"></i> NodeJS</li>
                </ul>
            </div>

            <h4>Frontend</h4>
            <div className={st.skills}>
                <ul>
                    <li><i className="devicon-vuejs-plain-wordmark"></i> Vue 2/3</li>
                    <li><i className="devicon-react-original-wordmark"></i> React</li>
                    <li><i className="devicon-nextjs-plain"></i> NextJS</li>
                    <li><i className="devicon-nuxtjs-plain"></i> NuxtJS</li>
                    <li><i className="devicon-tailwindcss-plain"></i> Tailwind CSS</li>
                    <li><i className="devicon-bootstrap-plain"></i> Bootstrap</li>
                    <li><i className="devicon-html5-plain-wordmark"></i> HTML5</li>
                    <li><i className="devicon-css3-plain-wordmark"></i> CSS3</li>
                </ul>
            </div>

            <h4>Backend &amp; Database</h4>
            <div className={st.skills}>
                <ul>
                    <li><i className="devicon-express-original"></i> ExpressJS</li>
                    <li><i className="devicon-nestjs-plain"></i> NestJS</li>
                    <li><i className="devicon-mongodb-plain-wordmark"></i> MongoDB</li>
                    <li><i className="devicon-socketio-original"></i> Socket.IO</li>
                    <li>JWT</li>
                    <li>Microservices</li>
                </ul>
            </div>

            <h4>Tools &amp; Platforms</h4>
            <div className={st.skills}>
                <ul>
                    <li><i className="devicon-docker-plain"></i> Docker</li>
                    <li><i className="devicon-kubernetes-plain"></i> Kubernetes</li>
                    <li><i className="devicon-git-plain"></i> Git</li>
                    <li><i className="devicon-linux-plain"></i> Linux</li>
                    <li><i className="devicon-amazonwebservices-plain-wordmark"></i> AWS EC2</li>
                    <li><i className="devicon-arduino-plain-wordmark"></i> Arduino</li>
                </ul>
            </div>

            <h4>Languages</h4>
            <div className={st.skills}>
                <ul>
                    <li>English (Fluent)</li>
                    <li>Nepali (Native)</li>
                    <li>Cantonese (Conversational)</li>
                </ul>
            </div>
        </div>
    )
}

export default Skills;
