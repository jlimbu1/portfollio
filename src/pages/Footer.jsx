import st from '../styles/App.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope, faMapMarkerAlt, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import useScrollReveal from '../hooks/useScrollReveal'

function Footer() {
    const [ref, visible] = useScrollReveal();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer id='contacts' className={st.footer}>
            <div ref={ref} className={`${st.footerInner} ${st.reveal} ${visible ? st.visible : ''}`}>
                <div className={st.footerGrid}>
                    <div className={st.footerBrand}>
                        <a href="#abouts" className={st.footerLogo}>
                            <img src="https://i.imgur.com/YLt0FBm.jpg" alt="Jimmy Limbu" />
                        </a>
                        <p className={st.footerTagline}>
                            Building robust, scalable software solutions with modern web technologies.
                        </p>
                    </div>

                    <div className={st.footerSection}>
                        <h3 className={st.footerHeading}>Quick Links</h3>
                        <nav className={st.footerNav}>
                            <a href="#abouts">About</a>
                            <a href="#educations">Education</a>
                            <a href="#experiences">Experience</a>
                            <a href="#projects">Projects</a>
                            <a href="#skills">Skills</a>
                        </nav>
                    </div>

                    <div className={st.footerSection}>
                        <h3 className={st.footerHeading}>Contact</h3>
                        <div className={st.footerContact}>
                            <p>
                                <FontAwesomeIcon icon={faPhone} className={st.footerIcon} />
                                <span>+852 54980873</span>
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faEnvelope} className={st.footerIcon} />
                                <a href="mailto:limbujimmy1@gmail.com">limbujimmy1@gmail.com</a>
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faMapMarkerAlt} className={st.footerIcon} />
                                <span>Mong Kok, Hong Kong</span>
                            </p>
                        </div>
                    </div>

                    <div className={st.footerSection}>
                        <h3 className={st.footerHeading}>Connect</h3>
                        <div className={st.footerSocial}>
                            <a href="https://github.com/jlimbu1" rel="noopener noreferrer" target="_blank" aria-label="GitHub">
                                <i className="devicon-github-original"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/limbu-jimmy-341a9422b/" rel="noopener noreferrer" target="_blank" aria-label="LinkedIn">
                                <i className="devicon-linkedin-plain"></i>
                            </a>
                            <a href="mailto:limbujimmy1@gmail.com" rel="noopener noreferrer" aria-label="Email">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M20 18h-2V9.25L12 13L6 9.25V18H4V6h1.2l6.8 4.25L18.8 6H20m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className={st.footerBottom}>
                    <p className={st.footerCopyright}>
                        &copy; {new Date().getFullYear()} Jimmy Limbu. All rights reserved.
                    </p>
                    <button
                        className={st.scrollTopBtn}
                        onClick={scrollToTop}
                        aria-label="Scroll to top"
                    >
                        <FontAwesomeIcon icon={faArrowUp} />
                    </button>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
