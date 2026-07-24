import st from '../styles/App.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import useScrollReveal from '../hooks/useScrollReveal'
import portfolioData from '../data/portfolio.json'

function Footer() {
    const [ref, visible] = useScrollReveal();
    const { contact, socialLinks } = portfolioData.footer;

    return (
        <footer id='contacts' className={st.container}>
            <div ref={ref} className={`${st.wrapper} ${st.reveal} ${visible ? st.visible : ''}`}>
            <h2>Contact</h2>
            <div className={st.contactInfo}>
                <p><FontAwesomeIcon icon={faPhone} className={st.icon} /> {contact.phone}</p>
                <p><FontAwesomeIcon icon={faEnvelope} className={st.icon} /> <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
            </div>
            <div className={st.socialLinks}>
                <a href={socialLinks.github.url} rel="noopener noreferrer" target="_blank" aria-label={socialLinks.github.label}>
                    <i className="devicon-github-original"></i>
                </a>
                <a href={socialLinks.linkedin.url} rel="noopener noreferrer" target="_blank" aria-label={socialLinks.linkedin.label}>
                    <i className="devicon-linkedin-plain"></i>
                </a>
                <a href={`mailto:${contact.email}`} rel="noopener noreferrer" aria-label={socialLinks.email.label}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                        <path fill="var(--primary-header-color)" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                </a>
            </div>
            </div>
        </footer>
    )
}

export default Footer
