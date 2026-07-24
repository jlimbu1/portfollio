import st from '../styles/App.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import useScrollReveal from '../hooks/useScrollReveal'

function Footer() {
    const [ref, visible] = useScrollReveal();

    return (
        <footer id='contacts' className={st.container}>
            <div ref={ref} className={`${st.wrapper} ${st.reveal} ${visible ? st.visible : ''}`}>
            <h2>Contact</h2>
            <div className={st.contactInfo}>
                <p><FontAwesomeIcon icon={faPhone} className={st.icon} /> +852 54980873</p>
                <p><FontAwesomeIcon icon={faEnvelope} className={st.icon} /> <a href="mailto:limbujimmy1@gmail.com">limbujimmy1@gmail.com</a></p>
            </div>
            <div className={st.socialLinks}>
                <a href="https://github.com/jlimbu1" rel="noopener noreferrer" target="_blank" aria-label="GitHub">
                    <i className="devicon-github-original"></i>
                </a>
                <a href="https://www.linkedin.com/in/limbu-jimmy-341a9422b/" rel="noopener noreferrer" target="_blank" aria-label="LinkedIn">
                    <i className="devicon-linkedin-plain"></i>
                </a>
                <a href="mailto:limbujimmy1@gmail.com" rel="noopener noreferrer" aria-label="Email">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                        <path fill="#2fcaa6" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                </a>
            </div>
            </div>
        </footer>
    )
}

export default Footer
