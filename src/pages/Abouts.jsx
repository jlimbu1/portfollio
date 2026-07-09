import st from '../styles/App.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'

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
                    <p>Software engineer with 4+ years of experience building interactive web applications. I specialize in Vue 3, React, and 3D configurator tools — currently leading frontend architecture at DIY ROCKS, where I built a white-label multi-tenant platform and real-time jewellery customization tools used across the B2B pipeline.</p>
                </div>
            </div>
        </div>
    )
}

export default Abouts;