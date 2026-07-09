import st from '../styles/App.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPhone, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons'

function Abouts() {
    return (
        <div id='abouts' className={st.container}>
            <div className={st.wrapper}>
                <img className={st.pfp} src="https://i.imgur.com/8wtSgQm.jpg" alt="Jimmy Limbu" />
                <div className={st.abouts}>
                    <h2>LIMBU Jimmy</h2>
                    <p className={st.subtitle}>Software Engineer</p>
                    <p><FontAwesomeIcon icon={faPhone} className={st.icon} /> +852 54980873</p>
                    <p><FontAwesomeIcon icon={faEnvelope} className={st.icon} /> limbujimmy1@gmail.com</p>
                    <p><FontAwesomeIcon icon={faHouse} className={st.icon} /> Mong Kok, Hong Kong</p>
                    <p><FontAwesomeIcon icon={faGlobe} className={st.icon} /> <a href="https://limbujimmy.netlify.app/" target="_blank" rel="noreferrer noopener">limbujimmy.netlify.app</a></p>
                    <p>I am a software engineer passionate about building interactive, real-time web applications. I specialize in frontend development with modern frameworks like Vue 3 and React, 3D configurator tools, and full-stack systems with clean architecture.</p>
                </div>
            </div>
        </div>
    )
}

export default Abouts;