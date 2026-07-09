import st from '../styles/App.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import useScrollReveal from '../hooks/useScrollReveal'

function Abouts() {
    const [ref, visible] = useScrollReveal();

    return (
        <div id='abouts' className={st.container}>
            <div ref={ref} className={`${st.wrapper} ${st.reveal} ${visible ? st.visible : ''}`}>
                <img className={st.pfp} src="https://i.imgur.com/8wtSgQm.jpg" alt="Jimmy Limbu" />
                <div className={st.abouts}>
                    <h2>About</h2>
                    <p className={st.subtitle}>Software Engineer</p>
                    <p><FontAwesomeIcon icon={faPhone} className={st.icon} /> +852 54980873</p>
                    <p><FontAwesomeIcon icon={faEnvelope} className={st.icon} /> limbujimmy1@gmail.com</p>
                    <p><FontAwesomeIcon icon={faHouse} className={st.icon} /> Mong Kok, Hong Kong</p>
                    <p>Software engineer with 4+ years of experience across B2B, B2C, SaaS, and ERP products. Proficient in Vue 3 and React, with a strong focus on frontend architecture, data integrity, and building real-time interactive tools. Currently at DIY ROCKS, leading the development of 3D jewellery configurators and a white-label multi-tenant platform.</p>
                </div>
            </div>
        </div>
    )
}

export default Abouts;
