import st from '../styles/App.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import useScrollReveal from '../hooks/useScrollReveal'

function Footer() {
  const [ref, visible] = useScrollReveal();

  return (
    <footer id="contacts" className={st.container}>
      <div ref={ref} className={`${st.reveal} ${visible ? st.visible : ''}`}>
        <div className="row text-center text-md-start align-items-center">
          <div className="col-12 col-md-6 mb-3 mb-md-0">
            <h2>Contact</h2>
            <div className={st.contactInfo}>
              <p className="mb-1">
                <FontAwesomeIcon icon={faPhone} className={st.icon} /> +852 54980873
              </p>
              <p>
                <FontAwesomeIcon icon={faEnvelope} className={st.icon} />{' '}
                <a href="mailto:limbujimmy1@gmail.com">limbujimmy1@gmail.com</a>
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex flex-column align-items-center align-items-md-end justify-content-center">
            <div className={st.socialLinks}>
              <a href="https://github.com/jlimbu1" rel="noopener noreferrer" target="_blank" aria-label="GitHub">
                <i className="devicon-github-original"></i>
              </a>
              <a href="https://www.linkedin.com/in/limbu-jimmy-341a9422b/" rel="noopener noreferrer" target="_blank" aria-label="LinkedIn">
                <i className="devicon-linkedin-plain"></i>
              </a>
              <a href="mailto:limbujimmy1@gmail.com" rel="noopener noreferrer" aria-label="Email">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M20 18h-2V9.25L12 13L6 9.25V18H4V6h1.2l6.8 4.25L18.8 6H20m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 text-center">
            <p className={st.copyright}>&copy; {new Date().getFullYear()} Jimmy Limbu. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;