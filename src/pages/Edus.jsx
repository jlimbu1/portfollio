import st from '../styles/App.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faGraduationCap, faCalendarDays } from '@fortawesome/free-solid-svg-icons'

function Edus() {
    return (
        <div id='educations' className={st.container}>
            <h2>Education</h2>
            <div className={st.eduGrid}>
                <div className={st.card}>
                    <img src="https://i.imgur.com/gAcsR1B.png" alt="HKUST" />
                    <div className="details">
                        <p><FontAwesomeIcon icon={faGraduationCap} className={st.icon} /> Bachelor of Engineering in Computer Engineering</p>
                        <p><FontAwesomeIcon icon={faCalendarDays} className={st.icon} /> Sept 2019 - Aug 2022</p>
                        <h4>Relevant Courses</h4>
                        <ul>
                            <li><FontAwesomeIcon icon={faBook} className={st.icon} /> Internet Computing</li>
                            <li><FontAwesomeIcon icon={faBook} className={st.icon} /> Mobile Application Development</li>
                            <li><FontAwesomeIcon icon={faBook} className={st.icon} /> Discrete Mathematical Tools for Computer Science</li>
                            <li><FontAwesomeIcon icon={faBook} className={st.icon} /> Industrial Experience</li>
                        </ul>
                    </div>
                </div>
                <div className={st.card}>
                    <img src="https://i.imgur.com/mignBUa.png" alt="CCCU" />
                    <div className="details">
                        <p><FontAwesomeIcon icon={faGraduationCap} className={st.icon} /> Associate of Engineering</p>
                        <p><FontAwesomeIcon icon={faCalendarDays} className={st.icon} /> Sept 2017 - Aug 2019</p>
                        <h4>Relevant Courses</h4>
                        <ul>
                            <li><FontAwesomeIcon icon={faBook} className={st.icon} /> Introduction to Programming</li>
                            <li><FontAwesomeIcon icon={faBook} className={st.icon} /> Object-Oriented Programming and Design</li>
                            <li><FontAwesomeIcon icon={faBook} className={st.icon} /> Data Structure and Algorithms</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edus;
