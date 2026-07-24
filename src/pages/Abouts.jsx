import st from '../styles/App.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import useScrollReveal from '../hooks/useScrollReveal'
import portfolioData from '../data/portfolio.json'

function Abouts() {
    const [ref, visible] = useScrollReveal();
    const about = portfolioData.about;

    return (
        <div id='abouts' className={st.container}>
            <div ref={ref} className={`${st.wrapper} ${st.reveal} ${visible ? st.visible : ''}`}>
                <img className={st.pfp} src={about.image} alt={about.name} />
                <div className={st.abouts}>
                    <h2>{about.heading}</h2>
                    <p className={st.subtitle}>{about.subtitle}</p>
                    <p><FontAwesomeIcon icon={faPhone} className={st.icon} /> {about.phone}</p>
                    <p><FontAwesomeIcon icon={faEnvelope} className={st.icon} /> {about.email}</p>
                    <p><FontAwesomeIcon icon={faHouse} className={st.icon} /> {about.location}</p>
                    <p>{about.bio}</p>
                </div>
            </div>
        </div>
    )
}

export default Abouts
