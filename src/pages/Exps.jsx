import st from '../styles/App.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faBuilding } from '@fortawesome/free-solid-svg-icons'
import useScrollReveal from '../hooks/useScrollReveal'

function Exps() {
    const [ref, visible] = useScrollReveal();

    return (
        <div id='experiences' className={st.container}>
            <div ref={ref} className={`${st.reveal} ${visible ? st.visible : ''}`}>
            <h2>Experience</h2>

            {/* DIY ROCKS - Frontend Data Engineer */}
            <div className={st.card}>
                <h4>Frontend Data Engineer</h4>
                <div className="details">
                    <p><FontAwesomeIcon icon={faBuilding} className={st.icon} /> DIY ROCKS (HK) Limited</p>
                    <p className={st.date}>Jan 2026 - Present</p>
                    <ul>
                        <li><FontAwesomeIcon icon={faArrowRight} className={st.icon} /> Act as technical liaison between product, external dev teams, and internal stakeholders, translating business requirements into actionable specifications.</li>
                        <li><FontAwesomeIcon icon={faArrowRight} className={st.icon} /> Manage white-label order systems, verifying configurator apps transmit accurate data to factory production pipelines.</li>
                        <li><FontAwesomeIcon icon={faArrowRight} className={st.icon} /> Coordinate across branches including China production team to ensure SKUs, pricing, and production specs are correctly structured and delivered.</li>
                        <li><FontAwesomeIcon icon={faArrowRight} className={st.icon} /> Expand configurator application functionality with new products, features, and system reliability improvements.</li>
                        <li><FontAwesomeIcon icon={faArrowRight} className={st.icon} /> Ensure end-to-end data integrity between 3D configurator, B2B order flow, and downstream production systems.</li>
                    </ul>
                </div>
            </div>

            {/* DIY ROCKS - Frontend Developer */}
            <div className={st.card}>
                <h4>Frontend Developer</h4>
                <div className="details">
                    <p><FontAwesomeIcon icon={faBuilding} className={st.icon} /> DIY ROCKS (HK) Limited</p>
                    <p className={st.date}>Jan 2025 - Dec 2025</p>
                    <ul>
                        <li><FontAwesomeIcon icon={faArrowRight} className={st.icon} /> Led migration of legacy Vue 2 projects to Vue 3, modernizing the codebase while preserving full core functionality.</li>
                        <li><FontAwesomeIcon icon={faArrowRight} className={st.icon} /> Built interactive, real-time 3D jewellery customization tools that served as the core selling point of the B2B platform.</li>
                        <li><FontAwesomeIcon icon={faArrowRight} className={st.icon} /> Drove a full product redesign to unify visual identity across all applications, strengthening brand recognition.</li>
                        <li><FontAwesomeIcon icon={faArrowRight} className={st.icon} /> Architected a container application hosting multiple configurator apps (Bridal, Jewellery, Wedding), defining inter-app communication protocols and data contracts.</li>
                        <li><FontAwesomeIcon icon={faArrowRight} className={st.icon} /> Designed and implemented a white-label multi-tenant system enabling per-customer customization of design themes, feature toggles, and branding deployed as an embeddable application.</li>
                        <li><FontAwesomeIcon icon={faArrowRight} className={st.icon} /> Collaborated closely with designers to validate design feasibility against technical constraints, identifying trade-offs and aligning on implementation scope.</li>
                        <li><FontAwesomeIcon icon={faArrowRight} className={st.icon} /> Provided direct customer-facing technical support, resolving software issues and answering product questions.</li>
                    </ul>
                </div>
            </div>

            {/* Fletrix */}
            <div className={st.card} id="fletrix">
                <h4>Software Engineer</h4>
                <div className="details">
                    <p><FontAwesomeIcon icon={faBuilding} className={st.icon} /> Fletrix Limited</p>
                    <p className={st.date}>Oct 2022 - Jun 2024</p>
                    <ul>
                        <li><FontAwesomeIcon icon={faArrowRight} className={st.icon} /> Built and maintained ERP scheduling module, CRUD interfaces for customer/booking/order data, and role-based access control using CASL on both frontend and backend.</li>
                        <li><FontAwesomeIcon icon={faArrowRight} className={st.icon} /> Developed full-stack features in an agile environment using VuetifyJS and NestJS across an internal ERP booking system and a companion SaaS POS-linked application.</li>
                        <li><FontAwesomeIcon icon={faArrowRight} className={st.icon} /> Built SaaS POS integration layer, syncing products, staff, and order data bidirectionally between POS devices and the ERP system.</li>
                        <li><FontAwesomeIcon icon={faArrowRight} className={st.icon} /> Developed a live analytics dashboard powered by complex MongoDB aggregation pipelines with selectable filters for real-time business insights.</li>
                        <li><FontAwesomeIcon icon={faArrowRight} className={st.icon} /> Designed UX-friendly interfaces with optimistic UI patterns in the SaaS product, ensuring responsive and seamless user experience.</li>
                        <li><FontAwesomeIcon icon={faArrowRight} className={st.icon} /> Built reusable frontend components to improve development efficiency and visual consistency across both platforms.</li>
                    </ul>
                </div>
            </div>

            {/* Wealthskey - Part Time */}
            <div className={st.card} id="wealthskey">
                <h4>Software Developer (Part-Time)</h4>
                <div className="details">
                    <p><FontAwesomeIcon icon={faBuilding} className={st.icon} /> Wealthskey Limited</p>
                    <p className={st.date}>Feb 2021 - Oct 2021</p>
                    <ul>
                        <li><FontAwesomeIcon icon={faArrowRight} className={st.icon} /> Built an international retail property website from scratch using ReactJS and NextJS.</li>
                        <li><FontAwesomeIcon icon={faArrowRight} className={st.icon} /> Implemented a subscription system with flexible pricing plans and PayPal REST API payment integration.</li>
                        <li><FontAwesomeIcon icon={faArrowRight} className={st.icon} /> Integrated Zoom OAuth API to allow users to schedule meetings directly from the platform.</li>
                        <li><FontAwesomeIcon icon={faArrowRight} className={st.icon} /> Saved API call responses to MongoDB and Elasticsearch database.</li>
                        <li><FontAwesomeIcon icon={faArrowRight} className={st.icon} /> Built frontend features including search with suggestions, property publishing flow, and page view tracking.</li>
                    </ul>
                </div>
            </div>

            {/* Wealthskey - Intern */}
            <div className={st.card}>
                <h4>Software Developer (Intern)</h4>
                <div className="details">
                    <p><FontAwesomeIcon icon={faBuilding} className={st.icon} /> Wealthskey Limited</p>
                    <p className={st.date}>Dec 2020 - Feb 2021</p>
                    <ul>
                        <li><FontAwesomeIcon icon={faArrowRight} className={st.icon} /> Created a Facebook chatbot using Chatfuel with conversational flowchart logic.</li>
                        <li><FontAwesomeIcon icon={faArrowRight} className={st.icon} /> Developed a user-friendly reservation page, strengthening frontend development skills.</li>
                    </ul>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Exps;
